const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createNewOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { coupon } = req.body;
	const userCart = await User.findById(_id).select("cart").populate("cart.product", "title price");
	const products = userCart?.cart?.map((el) => ({
		product: el.product._id,
		count: el.quantity,
		color: el.color,
	}));
	let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
	const createData = { products, total, orderBy: _id };
	if (coupon) {
		const selectedCoupon = await Coupon.findById(coupon);
		total = Math.round((total * (1 - +selectedCoupon.discount / 100)) / 1000) * 1000 || total;
		createData.total = total;
		createData.coupon = coupon;
	}
	const rs = await Order.create(createData);
	res.json({
		success: rs ? true : false,
		result: rs ? rs : "Something went wrong",
	});
});
const updateStatus = asyncHandler(async (req, res) => {
	const { oid } = req.params;
	const { status } = req.body;
	if (!status) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
	res.json({
		success: response ? true : false,
		result: response ? response : "Something went wrong",
	});
});
const getUserOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user;

	const response = await Order.find({ orderBy: _id });
	res.json({
		success: response ? true : false,
		result: response ? response : "Something went wrong",
	});
});
const getAdminOrder = asyncHandler(async (req, res) => {
	const response = await Order.find();
	res.json({
		success: response ? true : false,
		result: response ? response : "Something went wrong",
	});
});
module.exports = {
	createNewOrder,
	updateStatus,
	getUserOrder,
	getAdminOrder,
};
