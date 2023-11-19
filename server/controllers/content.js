const Content = require("../models/content");
const asyncHandler = require("express-async-handler");

const createNewContent = asyncHandler(async (req, res) => {
	const logo = req?.files?.logo[0]?.path;
	const banners = req.files?.banners?.map((el) => el.path);
	const bannerSub = req.files?.bannerSub?.map((el) => el.path);
	if (req.body.logo) req.body.logo = logo;
	if (req.body.logo) req.body.banners = banners;
	if (req.body.logo) req.body.bannerSub = bannerSub;
	const newContent = await Content.create(req.body);
	return res.status(200).json({
		success: newContent ? true : false,
		mes: newContent ? "Tạo nội dung thành công" : "Không tạo được nội dung",
	});
});
const getContents = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering

	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Content.find(qr);
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
			const counts = await Content.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				contents: response ? response : "Không thể lấy tất cả nội dung",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

const getContent = asyncHandler(async (req, res) => {
	const { cid } = req.params;
	const content = await Content.findById(cid);
	return res.json({
		success: content ? true : false,
		content: content ? content : "Không thể lấy nội dung",
	});
});

const updatedContent = asyncHandler(async (req, res) => {
	const { cid } = req.params;
	const files = req?.files;
	if (files?.logo) req.body.logo = files?.logo[0]?.path;
	if (files?.banners) req.body.banners = files?.banners?.map((el) => el.path);
	if (files?.bannerSub) req.body.bannerSub = files?.bannerSub?.map((el) => el.path);
	const updatedContent = await Content.findByIdAndUpdate(cid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: updatedContent ? true : false,
		mes: updatedContent ? "Cập nhật nội dung thành công" : "Không thể cập nhật nội dung",
	});
});
const deletedContent = asyncHandler(async (req, res) => {
	const { cid } = req.params;
	const response = await Content.findByIdAndDelete(cid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa nội dung thành công" : "Không thể xóa nội dung",
	});
});

module.exports = {
	createNewContent,
	getContent,
	getContents,
	updatedContent,
	deletedContent,
};
