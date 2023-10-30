const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createNewOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { products, total, address, status, orderBy, paymentMethod, coupon } = req.body;
	let totalVND;
	if (address) {
		await User.findOneAndUpdate({ _id: _id }, { $set: { address, cart: [] } });
		const idProductArr = products.map((el) => el._id);
		for (const productId of idProductArr) {
			const productInOrder = products.find((product) => product._id === productId);
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
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
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
