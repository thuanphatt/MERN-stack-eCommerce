const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const createCategory = asyncHandler(async (req, res) => {
	const { title } = req.body;
	if (!title) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await BlogCategory.create(req.body);
	return res.json({
		success: response ? true : false,
		mes: response ? "Tạo danh mục blog thành công" : "Không thể tạo danh mục blog",
	});
});
const getCategories = asyncHandler(async (req, res) => {
	const response = await BlogCategory.find();
	return res.json({
		success: response ? true : false,
		blogCategories: response ? response : "Không thể lấy danh mục blog",
	});
});
const updatedCategory = asyncHandler(async (req, res) => {
	const { bcid } = req.params;
	const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
		new: true,
	});
	return res.json({
		success: response ? true : false,
		mes: response ? "Cập nhật danh mục blog thành công" : "Không thể cập nhập danh mục blog",
	});
});
const deletedCategory = asyncHandler(async (req, res) => {
	const { bcid } = req.params;
	const response = await BlogCategory.findByIdAndDelete(bcid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Xóa danh mục blog thành công" : "Không thể xóa danh mục blog",
	});
});

module.exports = {
	createCategory,
	getCategories,
	updatedCategory,
	deletedCategory,
};
