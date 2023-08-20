const { query } = require("express");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    sucess: newProduct ? true : false,
    created: newProduct ? newProduct : "No create product",
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    sucess: product ? true : false,
    created: product ? product : "Cannot get product",
  });
});
// Filter, sort and pagination product
const getAllProduct = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Exclude special fields out of query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  // Format operators for right syntax of MongoDB
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchEl) => `$${matchEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  // Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatedQueries);
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limiting

  // Panagation

  // Execute the query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await Product.find(formatedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        products: response ? response : "Cannot get products",
        counts,
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    sucess: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  const deleteProduct = await Product.findByIdAndDelete(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    sucess: deleteProduct ? true : false,
    deleteProduct: deleteProduct ? deleteProduct : "Cannot delete product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
