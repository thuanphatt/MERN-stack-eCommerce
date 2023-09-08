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
  // abc,efg => [abc,efg] => abc efg
  if (req.query.sort) {
    const sortBy = req.query.sort?.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limiting
  if (req.query.sort) {
    const fields = req.query.fields?.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Panagation

  const page = +req.query.page || 1; // + mean: convert string to number
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS; // number of object after call API
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Execute the query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await Product.find(formatedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        products: response ? response : "Cannot get products",
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
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;

  if (!star || !pid) throw new Error("Missing inputs");
  const ratingProduct = await Product.findById(pid);
  console.log(ratingProduct);
  const isRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  if (isRating) {
    // update star & comment
    await Product.updateOne(
      { ratings: { $elemMatch: isRating } },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    // add star & comment
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: {
          ratings: {
            star,
            comment,
            postedBy: _id,
          },
        },
      },
      { new: true }
    );
  }
  // sum total rating
  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();
  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});
const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const imagesPath = req.files.map((el) => el.path);
  if (!req.files) throw new Error("Missing inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: imagesPath } } },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedProduct: response ? response : "Cannot upload images product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
