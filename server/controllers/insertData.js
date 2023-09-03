const Product = require("../models/product");
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
    color:
      product?.variants?.find((el) => el.label === "Color")?.variants[0] ||
      "WHITE",
  });
};
const insertData = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  return res.json("Done");
});
module.exports = {
  insertData,
};