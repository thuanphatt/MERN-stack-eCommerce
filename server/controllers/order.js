const Order = require("../models/order");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const createNewOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userCart = await User.findById(_id).select("cart");
  res.json({
    success: userCart ? true : false,
    userCart,
  });
});
module.exports = {
  createNewOrder,
};
