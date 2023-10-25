const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
	const { title, description, category } = req.body;
	const image = req?.files?.image[0]?.path;
	if (!(title && description && category)) throw new Error("Thông tin đầu vào bị thiếu");
	if (req.body.image) req.body.image = image;

	const newBlog = await Blog.create(req.body);
	return res.status(200).json({
		success: newBlog ? true : false,
		mes: newBlog ? "Tạo tin tức thành công" : "Không tạo được tin tức",
	});
});
const getBlogs = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);

	let queryObject = {};
	// Filtering
	if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: "i" };
	if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: "i" };
	if (queries?.description) formatedQueries.description = { $regex: queries.description, $options: "i" };

	if (queries?.q) {
		delete formatedQueries.q;
		queryObject = {
			$or: [{ title: { $regex: queries.q, $options: "i" } }],
		};
	}
	const qr = { ...formatedQueries, ...queryObject };
	let queryCommand = Blog.find(qr);

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
			const counts = await Blog.find({
				$and: [queries, queryObject], // Combine the queries
			}).countDocuments();

			return res.status(200).json({
				success: response ? true : false,
				counts,
				blogs: response ? response : "Không thể lấy tất cả tin tức",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});

const getBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
		.populate("likes", "firstName lastName")
		.populate("dislikes", "firstName lastName");
	return res.json({
		success: blog ? true : false,
		blog: blog ? blog : "Cannot be get blog",
	});
});

const updatedBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	const files = req?.files;

	if (files?.image) req.body.image = files?.image[0]?.path;
	const updatedBlog = await Blog.findByIdAndUpdate(bid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: updatedBlog ? true : false,
		mes: updatedBlog ? "Cập nhật tin tức thành công" : "Không thể cập nhật tin tức",
	});
});
const deletedBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	const response = await Blog.findByIdAndDelete(bid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa tin tức thành công" : "Không thể xóa tin tức",
	});
});
const likeBlog = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { bid } = req.params;
	if (!bid) throw new Error("Thông tin đầu vào bị thiếu");
	const blog = await Blog.findById(bid);
	const alreadyDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
	if (alreadyDisliked) {
		const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id, isDisliked: false } }, { new: true });
		return res.json({
			success: response ? true : false,
			results: response,
		});
	}
	const isLiked = blog?.likes?.find((el) => el.toString() === _id);
	if (isLiked) {
		const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
		return res.json({
			success: response ? true : false,
			results: response,
		});
	} else {
		const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
		return res.json({
			success: response ? true : false,
			results: response,
		});
	}
});
const dislikeBlog = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { bid } = req.params;
	if (!bid) throw new Error("Thông tin đầu vào bị thiếu");
	const blog = await Blog.findById(bid);
	const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
	if (alreadyLiked) {
		const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
		return res.json({
			success: response ? true : false,
			results: response,
		});
	}
	const isDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
	if (isDisliked) {
		const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
		return res.json({
			success: response ? true : false,
			results: response,
		});
	} else {
		const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
		return res.json({
			success: response ? true : false,
			results: response,
		});
	}
});
const uploadImagesBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;

	if (!req.file) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true });
	console.log(req.file);
	return res.json({
		success: response ? true : false,
		uploadImagesBlog: response ? response : "Cannot upload upload images blog",
	});
});

module.exports = {
	createNewBlog,
	getBlog,
	getBlogs,
	updatedBlog,
	deletedBlog,
	likeBlog,
	dislikeBlog,
	uploadImagesBlog,
};
