const Banner = require("../models/banner");
const asyncHandler = require("express-async-handler");

const createNewBanner = asyncHandler(async (req, res) => {
	const image = req?.files?.image[0]?.path;
	if (req.body.image) req.body.image = image;
	const newBanner = await Banner.create(req.body);
	return res.status(200).json({
		success: newBanner ? true : false,
		mes: newBanner ? "Tạo banner thành công" : "Không tạo được banner",
	});
});
const getBanners = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering

	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Banner.find(qr);
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
			const counts = await Banner.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				banners: response ? response : "Không thể lấy tất cả banners",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

const getBanner = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	const banner = await Banner.findById(bid);
	return res.json({
		success: banner ? true : false,
		banner: banner ? banner : "Không thể lấy banner",
	});
});

const updatedBanner = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	const files = req?.files;

	if (files?.image) req.body.image = files?.image[0]?.path;
	const updatedBanner = await Banner.findByIdAndUpdate(bid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: updatedBanner ? true : false,
		mes: updatedBanner ? "Cập nhật banner thành công" : "Không thể cập nhật banner",
	});
});
const deletedBanner = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	const response = await Banner.findByIdAndDelete(bid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa banner thành công" : "Không thể xóa banner",
	});
});

module.exports = {
	createNewBanner,
	getBanner,
	getBanners,
	updatedBanner,
	deletedBanner,
};
