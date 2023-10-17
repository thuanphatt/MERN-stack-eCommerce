const Order = require("../models/order");
const User = require("../models/user");
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
	const { products, total, address, status } = req.body;
	if (address) {
		await User.findByIdAndUpdate(_id, { address, cart: [] });
	}
	const data = { products, total: total * 24475, orderBy: _id };
	if (status) data.status = status;
	const newOrder = await Order.create(data);
	const user = await User.findById(_id).select("firstName lastName address mobile");
	res.json({
		success: newOrder ? true : false,
		result: newOrder ? { order: newOrder, user } : "Đã có lỗi xảy ra",
	});
});
const updateStatus = asyncHandler(async (req, res) => {
	const { oid } = req.params;
	const { status } = req.body;
	if (!status) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
	res.json({
		success: response ? true : false,
		result: response ? response : "Đã có lỗi xảy ra",
	});
});
const getUserOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const response = await Order.find({ orderBy: _id });

	res.json({
		success: response ? true : false,
		result: response ? response : "Đã có lỗi xảy ra",
	});
});
const getAdminOrder = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	if (req.query.q) {
		delete formatedQueries.q;
		formatedQueries["$or"] = [
			{ orderBy: { $regex: req.query.q, $options: "i" } },
			{ total: { $regex: req.query.q, $options: "i" } },
		];
	}
	let queryCommand = Order.find(formatedQueries);
	if (req.query.sort) {
		const sortBy = req.query.sort?.split(",").join(" ");
		queryCommand = queryCommand.sort(sortBy);
	}
	if (req.query.fields) {
		const fields = req.query.fields?.split(",").join(" ");
		queryCommand = queryCommand.select(fields);
	}

	const page = +req.query.page || 1; // + mean: convert string to number
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS; // number of object after call API
	const skip = (page - 1) * limit;
	queryCommand.skip(skip).limit(limit);
	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await Order.find(queries).countDocuments();
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
};
