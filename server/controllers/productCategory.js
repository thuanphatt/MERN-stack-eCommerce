const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response ? response : "Cannot be created product category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("title _id");
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
    updatedCategory: response ? response : "Cannot be updated product category",
  });
});
const deletedCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(pcid);
  return res.json({
    success: response ? true : false,
    deletedCategory: response ? response : "Cannot be deleted product category",
  });
});
module.exports = {
  createCategory,
  getCategories,
  updatedCategory,
  deletedCategory,
};
