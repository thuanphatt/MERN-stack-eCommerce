const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const createNewCoupon = asyncHandler(async (req, res) => {
	const { name, discount, expiry } = req.body;
	if (!name || !discount || !expiry) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Coupon.create({
		...req.body,
		expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
	});
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã tạo mã giảm giá thành công" : "Không thể tạo mã giảm giá",
	});
});
const getCoupons = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering
	if (queries?.type) formatedQueries.type = { $regex: queries.type, $options: "i" };

	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [{ name: { $regex: queries.q, $options: "i" } }],
		};
	}
	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Coupon.find(qr);

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
			const counts = await Coupon.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				coupons: response ? response : "Không thể lấy mã giảm giá",
				counts,
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});
const getCoupon = asyncHandler(async (req, res) => {
	const { cid } = req.params;
	const response = await Coupon.findById(cid);
	return res.json({
		success: response ? true : false,
		coupon: response ? response : "Không thể lấy mã giảm giá",
	});
});
const updatedCoupon = asyncHandler(async (req, res) => {
	const { cid } = req.params;
	if (Object.keys(req.body).length === 0) throw new Error("Thông tin đầu vào bị thiếu");
	if (req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
	const response = await Coupon.findByIdAndUpdate(cid, req.body, {
		new: true,
	});
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã cập nhật mã giảm giá thành công" : "Không thể cập nhật mã giảm giá",
	});
});
const deletedCoupon = asyncHandler(async (req, res) => {
	const { cid } = req.params;
	const response = await Coupon.findByIdAndDelete(cid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa mã giảm giá thành công" : "Không thể xóa mã giảm giá",
	});
});

module.exports = {
	createNewCoupon,
	getCoupons,
	getCoupon,
	updatedCoupon,
	deletedCoupon,
};
