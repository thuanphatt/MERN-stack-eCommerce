const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const createCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response ? response : "Cannot be created blog category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    blogCategories: response ? response : "Cannot be get blog categories",
  });
});
const updatedCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedCategory: response ? response : "Cannot be updated blog category",
  });
});
const deletedCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid);
  return res.json({
    success: response ? true : false,
    deletedCategory: response ? response : "Cannot be deleted blog category",
  });
});
module.exports = {
  createCategory,
  getCategories,
  updatedCategory,
  deletedCategory,
};
