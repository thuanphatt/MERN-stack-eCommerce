const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const createNewBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBrand: response ? response : "Cannot be created brand",
  });
});
const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    brands: response ? response : "Cannot be get brands",
  });
});
const updatedBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await Brand.findByIdAndUpdate(brid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedBrand: response ? response : "Cannot be updated brand",
  });
});
const deletedBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await Brand.findByIdAndDelete(brid);
  return res.json({
    success: response ? true : false,
    deletedBrand: response ? response : "Cannot be deleted brand",
  });
});

module.exports = {
  createNewBrand,
  getBrands,
  updatedBrand,
  deletedBrand,
};
