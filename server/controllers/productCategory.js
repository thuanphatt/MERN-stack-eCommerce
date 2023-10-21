const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
	const { title, brand } = req.body;
	const image = req?.files?.image[0]?.path;
	if (!(title && brand)) throw new Error("Thông tin đầu vào bị thiếu");
	if (req.body.image) req.body.image = image;
	if (req.body.brand && typeof req.body.brand === "string") {
		req.body.brand = req.body.brand.split(",").map((item) => item.trim());
	}
	const newCategory = await ProductCategory.create(req.body);
	return res.status(200).json({
		success: newCategory ? true : false,
		mes: newCategory ? "Tạo danh mục thành công" : "Không tạo được danh mục",
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

	const deleteProduct = await ProductCategory.findByIdAndDelete(pcid, req.body, {
		new: true,
	});
	return res.status(200).json({
		success: deleteProduct ? true : false,
		mes: deleteProduct ? "Đã xóa danh mục thành công" : "Không thể xóa danh mục",
	});
});
module.exports = {
	createCategory,
	getCategories,
	updatedCategory,
	deletedCategory,
};
