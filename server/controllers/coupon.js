const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const createNewCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCoupon: response ? response : "Cannot be created coupon",
  });
});
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find();
  return res.json({
    success: response ? true : false,
    coupons: response ? response : "Cannot be get Coupons",
  });
});
const updatedCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedCoupon: response ? response : "Cannot be updated coupon",
  });
});
const deletedCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndDelete(cid);
  return res.json({
    success: response ? true : false,
    deletedCoupon: response ? response : "Cannot be deleted coupon",
  });
});

module.exports = {
  createNewCoupon,
  getCoupons,
  updatedCoupon,
  deletedCoupon,
};
