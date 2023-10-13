const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");
const createNewBlog = asyncHandler(async (req, res) => {
	const { title, description, category } = req.body;
	if (!title || !description || !category) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Blog.create(req.body);
	return res.json({
		success: response ? true : false,
		createdBlog: response ? response : "Cannot be create new blog",
	});
});
const getBlogs = asyncHandler(async (req, res) => {
	const response = await Blog.find();
	return res.json({
		success: response ? true : false,
		blogs: response ? response : "Cannot be get blogs",
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
	if (Object.keys(req.body).length === 0) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
	return res.json({
		success: response ? true : false,
		createdBlog: response ? response : "Cannot update blog",
	});
});
const deletedBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params;
	const response = await Blog.findByIdAndDelete(bid);
	return res.json({
		success: response ? true : false,
		deletedBlog: response ? response : "Cannot delete blog",
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
