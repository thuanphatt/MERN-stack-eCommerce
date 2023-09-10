const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const categoryData = require("../../data/cate_brand");
const data = require("../../data/data2.json");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + " ",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price.match(/\d/g).join("")) / 100),
    category: product?.category,
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    thumb: product?.thumb,
    color:
      product?.variants?.find((el) => el.label === "Color")?.variants[0] ||
      "WHITE",
    thumb: product?.thumb,
    totalRatings: Math.round(Math.random() * 5),
  });
};

const insertData = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  return res.json("Done");
});
const fn2 = async (category) => {
  await ProductCategory.create({
    title: category?.cate,
    brand: category?.brand,
  });
};
const insertCateData = asyncHandler(async (req, res) => {
  const promises = [];
  for (let cate of categoryData) promises.push(fn2(cate));
  await Promise.all(promises);
  return res.json("Done");
});
module.exports = {
  insertData,
  insertCateData,
};
