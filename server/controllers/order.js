const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const sendMail = require("../utils/sendMail");

const createNewOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { products, total, address, status, orderBy, paymentMethod, coupon } = req.body;
	let totalVND;
	if (address) {
		await User.findOneAndUpdate({ _id: _id }, { $set: { address, cart: [] } });
	}

	// Tạo đối tượng Order
	const data = { products, total, orderBy };

	if (data) {
		if (paymentMethod === "Paypal") {
			totalVND = total * 24475;
			data.total = totalVND;
		}
		if (coupon) {
			const selectedCoupon = await Coupon.findById(coupon);
			if (paymentMethod === "Paypal") {
				totalVND = total * 24475;
				data.total = totalVND;
				totalVND = Math.round((totalVND * (1 - +selectedCoupon.discount / 100)) / 1000) * 1000 || totalVND;
				data.coupon = coupon;
			}
			data.coupon = coupon;
		}
		if (status) data.status = status;
		if (paymentMethod) data.paymentMethod = paymentMethod;
		const rs = await Order.create(data);
		if (rs) {
			const productsHTML = data.products.map(
				(product) =>
					`<li>
					<h2>${product.title}</h2>
					<p>Số lượng: ${product.quantity}</p>
					<p>Màu: ${product.color}</p>
					<p>Giá: ${product.price}VND</p>
					<img src="${product.thumbnail}" alt="${product.title}" style="max-width: 200px; height: auto;" />
				  </li>`
			);

			const customerInfoHTML = `
				<h2>Thông tin khách hàng</h2>
				<p>Họ và tên: ${data.orderBy.firstName} ${data.orderBy.lastName}</p>
				<p>Email: ${data.orderBy.email}</p>
				<p>Địa chỉ: ${data.orderBy.address.join(", ")}</p>
			  `;
			const totalHTML = `<h2>Tổng tiền: ${data.total}VND</h2>`;
			const statusHTML = `<h2>Trạng thái: ${data.status}</h2>`;
			const paymentMethodHTML = `<h2>Hình thức thanh toán: ${data.paymentMethod}</h2>`;

			const orderDetailsHTML = `
				<h1 class="text-3xl font-bold tracking-tight">
				  <span>Chi tiết đơn hàng </span>
				 
				</h1>
				${statusHTML}
				${paymentMethodHTML}
				<ul>${productsHTML.join("")}</ul>
				${customerInfoHTML}
				${totalHTML}
			  `;
			const html = orderDetailsHTML;

			await sendMail({
				email: data.orderBy.email,
				html,
				subject: "Chúc mừng, bạn đã đặt hàng thành công vui lòng kiểm tra đơn hàng!",
			});
		}
		res.json({
			success: rs ? true : false,
			result: rs ? rs : "Đã có lỗi xảy ra",
		});
	}
});

const updateStatus = asyncHandler(async (req, res) => {
	const { oid } = req.params;
	const { status } = req.body;

	if (!status) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Order.findByIdAndUpdate(
		oid,
		{ status: status },
		{
			new: true,
		}
	);
	if (status === "Đang giao") {
		const orderCurrent = await Order.findById(oid);
		const idProductArr = orderCurrent.products.map((el) => el._id);
		for (const productId of idProductArr) {
			const productInOrder = orderCurrent.products.find((product) => product._id === productId);
			if (productInOrder) {
				const product = await Product.findOne({ _id: productInOrder.product._id });
				if (product) {
					const quantityProductOrder = productInOrder.quantity;
					await Product.findOneAndUpdate(
						{ _id: productInOrder.product._id },
						{
							$set: { quantity: product.quantity - quantityProductOrder },
							$inc: { sold: quantityProductOrder },
						}
					);
				}
			}
		}
		const productsHTML = orderCurrent.products.map(
			(product) =>
				`<li>
				<h2>${product.title}</h2>
				<p>Số lượng: ${product.quantity}</p>
				<p>Màu: ${product.color}</p>
				<p>Giá: ${product.price}</p>
				<img src="${product.thumbnail}" alt="${product.title}" style="max-width: 200px; height: auto;" />
			  </li>`
		);

		const customerInfoHTML = `
			<h2>Thông tin khách hàng</h2>
			<p>Họ và tên: ${orderCurrent.orderBy.firstName} ${orderCurrent.orderBy.lastName}</p>
			<p>Email: ${orderCurrent.orderBy.email}</p>
			<p>Địa chỉ: ${orderCurrent.orderBy.address.join(", ")}</p>
		  `;
		const totalHTML = `<h2>Tổng tiền: ${orderCurrent.total}</h2>`;
		const statusHTML = `<h2>Trạng thái: ${orderCurrent.status}</h2>`;
		const paymentMethodHTML = `<h2>Hình thức thanh toán: ${orderCurrent.paymentMethod}</h2>`;

		const orderDetailsHTML = `
			<h1 class="text-3xl font-bold tracking-tight">
				  <span>Đơn hàng đang trên đường được giao đến bạn </span>	
			</h1>
			<h3 class="text-xl font-bold tracking-tight">
			<span>Chi tiết đơn hàng </span>
			</h3>
			
			${statusHTML}
			${paymentMethodHTML}
			<ul>${productsHTML.join("")}</ul>
			${customerInfoHTML}
			${totalHTML}
		  `;
		const html = orderDetailsHTML;
		await sendMail({
			email: orderCurrent.orderBy.email,
			html,
			subject: "Đơn hàng đang trên đường giao đến bạn!",
		});
	}
	res.json({
		success: response ? true : false,
		mes: response ? "Cập nhật trạng thái thành công" : "Đã có lỗi xảy ra",
	});
});
const getUserOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering
	if (queries?.status) formatedQueries.status = { $regex: queries.status, $options: "i" };
	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [{ status: { $regex: queries.q, $options: "i" } }],
		};
	}
	const qr = { "orderBy._id": _id, ...formatedQueries, ...queryObject };
	let queryCommand = Order.find(qr);

	if (req.query.sort) {
		const sortBy = req.query.sort?.split(",").join(" ");
		queryCommand = queryCommand.sort(sortBy);
	}

	if (req.query.fields) {
		const fields = req.query.fields?.split(",").join(" ");
		queryCommand = queryCommand.select(fields);
	}

	const page = +req.query.page || 1;
	const limit = +req.query.limit;
	const skip = (page - 1) * limit;

	queryCommand.skip(skip).limit(limit);

	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await Order.find(qr).countDocuments();
			return res.status(200).json({
				success: response ? true : false,
				counts,
				order: response ? response : "Không thể lấy tất cả đơn hàng",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});
const getAdminOrder = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering
	if (queries?.status) formatedQueries.status = { $regex: queries.status, $options: "i" };

	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [
				{ "orderBy.lastName": { $regex: queries.q, $options: "i" } },
				{ "orderBy.firstName": { $regex: queries.q, $options: "i" } },
			],
		};
	}
	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Order.find(qr);

	if (req.query.sort) {
		const sortBy = req.query.sort?.split(",").join(" ");
		queryCommand = queryCommand.sort(sortBy);
	}

	if (req.query.fields) {
		const fields = req.query.fields?.split(",").join(" ");
		queryCommand = queryCommand.select(fields);
	}

	const page = +req.query.page || 1;
	const limit = +req.query.limit;
	// const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
	const skip = (page - 1) * limit;

	queryCommand.skip(skip).limit(limit);

	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await Order.find(qr).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				orders: response ? response : "Không thể lấy tất cả đơn hàng",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});
const deleteOrder = asyncHandler(async (req, res) => {
	const { oid } = req.params;
	const response = await Order.findByIdAndDelete(oid);
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? "Đã xóa thành công" : "Đã có lỗi xảy ra",
	});
});
const getDetailOrder = asyncHandler(async (req, res) => {
	const { oid } = req.params;
	const response = await Order.findById(oid);
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? response : "Đã có lỗi xảy ra",
	});
});

module.exports = {
	createNewOrder,
	updateStatus,
	getUserOrder,
	getAdminOrder,
	deleteOrder,
	getDetailOrder,
};
