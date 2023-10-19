const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const createCategory = asyncHandler(async (req, res) => {
	const response = await ProductCategory.create(req.body);
	return res.json({
		success: response ? true : false,
		mes: response ? "Tạo danh mục thành công" : "Không thể tạo danh mục",
	});
});
const getCategories = asyncHandler(async (req, res) => {
	const response = await ProductCategory.find();
	return res.json({
		success: response ? true : false,
		prodCategories: response ? response : "Cannot be get product categories",
	});
});
const updatedCategory = asyncHandler(async (req, res) => {
	const { pcid } = req.params;
	const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
		new: true,
	});
	return res.json({
		success: response ? true : false,
		mes: response ? "Cập nhật danh mục thành công" : "Không thể cập nhật danh mục",
	});
});
const deletedCategory = asyncHandler(async (req, res) => {
	const { pcid } = req.params;
	const response = await ProductCategory.findByIdAndDelete(pcid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Xóa danh mục thành công" : "Không thể xóa danh mục",
	});
});
module.exports = {
	createCategory,
	getCategories,
	updatedCategory,
	deletedCategory,
};
