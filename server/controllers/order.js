const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

// const createNewOrder = asyncHandler(async (req, res) => {
// 	const { _id } = req.user;
// 	const { coupon } = req.body;
// 	const userCart = await User.findById(_id).select("cart").populate("cart.product", "title price");
// 	const products = userCart?.cart?.map((el) => ({
// 		product: el.product._id,
// 		count: el.quantity,
// 		color: el.color,
// 	}));
// 	let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
// 	const createData = { products, total, orderBy: _id };
// 	if (coupon) {
// 		const selectedCoupon = await Coupon.findById(coupon);
// 		total = Math.round((total * (1 - +selectedCoupon.discount / 100)) / 1000) * 1000 || total;
// 		createData.total = total;
// 		createData.coupon = coupon;
// 	}
// 	const rs = await Order.create(createData);
// 	res.json({
// 		success: rs ? true : false,
// 		result: rs ? rs : "Đã có lỗi xảy ra",
// 	});
// });
const createNewOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { products, total, address, status, orderBy, paymentMethod } = req.body;
	const totalVND = total * 24475;
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
	const data = { products, total: totalVND, orderBy };
	if (status) data.status = status;
	if (paymentMethod) data.paymentMethod = paymentMethod;
	const rs = await Order.create(data);

	res.json({
		success: rs ? true : false,
		result: rs ? rs : "Đã có lỗi xảy ra",
	});
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
	const response = await Order.find({ "orderBy._id": _id });
	res.json({
		success: response ? true : false,
		result: response ? response : "Đã có lỗi xảy ra",
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
const getAdminOrder = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering
	if (queries?.status) formatedQueries.status = { $regex: queries.title, $options: "i" };
	// if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: "i" };

	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [
				{ status: { $regex: queries.q, $options: "i" } },
				// { color: { $regex: queries.q, $options: "i" } },
				// { category: { $regex: queries.q, $options: "i" } },
				// { brand: { $regex: queries.q, $options: "i" } },
				// { description: { $regex: queries.q, $options: "i" } },
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
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
	const skip = (page - 1) * limit;

	queryCommand.skip(skip).limit(limit);

	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await Order.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

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

module.exports = {
	createNewOrder,
	updateStatus,
	getUserOrder,
	getAdminOrder,
	deleteOrder,
	getDetailOrder,
};
