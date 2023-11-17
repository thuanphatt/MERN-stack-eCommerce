const Revenue = require("../models/revenuePredict");
const asyncHandler = require("express-async-handler");

const createNewRevenue = asyncHandler(async (req, res) => {
	const { revenues } = req.body;
	if (!revenues) throw new Error("Thông tin đầu vào bị thiếu");
	const newRevenue = await Revenue.create(req.body);
	return res.status(200).json({
		success: newRevenue ? true : false,
		mes: newRevenue ? "Tạo doanh thu dự kiến thành công" : "Không tạo được doanh thu dự kiến",
	});
});
const getRevenues = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering

	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Revenue.find(qr);
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
			const counts = await Revenue.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				revenues: response ? response : "Không thể lấy tất cả doanh thu",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

const deletedRevenuePredict = asyncHandler(async (req, res) => {
	const { rid } = req.params;
	const response = await Revenue.findByIdAndDelete(rid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa doanh thu thành công" : "Không thể xóa doanh thu",
	});
});

module.exports = {
	createNewRevenue,
	deletedRevenuePredict,
	getRevenues,
};
