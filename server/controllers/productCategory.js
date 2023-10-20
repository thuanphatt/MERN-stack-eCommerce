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
	const files = req?.files;
	if (req.body.brand && typeof req.body.brand === "string") {
		req.body.brand = req.body.brand.split(",").map((item) => item.trim());
	}
	if (files?.image) req.body.image = files?.image[0]?.path;
	const updatedCategory = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: updatedCategory ? true : false,
		mes: updatedCategory ? "Cập nhật sản phẩm thành công" : "Không thể cập nhật sản phẩm",
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
