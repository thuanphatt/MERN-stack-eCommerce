const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const makeToken = require("uniqid");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendMail = require("../utils/sendMail");

// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;
//   if (!email || !password || !firstName || !lastName)
//     return res.status(400).json({
//       success: false,
//       mes: "Missing inputs",
//     });
//   const user = await User.findOne({ email });
//   if (user) throw new Error("User has already been registered");
//   else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       mes: newUser
//         ? "Register is successfully. Please login"
//         : "Something went wrong",
//     });
//   }
// });

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, mobile } = req.body;
  if (!email || !password || !firstName || !lastName || !mobile)
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("User has already been registered");
  else {
    const token = makeToken();
    res.cookie(
      "dataregister",
      { ...req.body, token },
      {
        httpOnly: true,

        maxAge: 15 * 60 * 1000,
      }
    );

    const html = `Xin vui lòng bấm vào link dưới đây để hoàn tất quá trình đăng ký của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/registerfinal/${token}>Click here</a>`;
    await sendMail({ email, html, subject: "Hoàn tất đăng ký" });
    return res.status(200).json({
      success: true,
      mes: "Please check email to active account",
    });
  }
});
const registerFinal = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  console.log(cookie);
  if (!cookie || cookie?.dataregister?.token !== token) {
    res.clearCookie("dataregister");
    return res.redirect(`${process.env.CLIENT_URL}/registerfinal/failed`);
  }
  const newUser = await User.create({
    email: cookie?.dataregister?.email,
    password: cookie?.dataregister?.password,
    lastName: cookie?.dataregister?.lastName,
    firstName: cookie?.dataregister?.firstName,
    mobile: cookie?.dataregister?.mobile,
  });
  res.clearCookie("dataregister");
  if (newUser)
    return res.redirect(`${process.env.CLIENT_URL}/registerfinal/success`);
  else return res.redirect(`${process.env.CLIENT_URL}/registerfinal/failed`);
});
// Refresh token => create new access token
// Access token => Authenticated & Authorization User
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // drop password & role in response
    const { password, role, refreshToken, ...userData } = response.toObject();
    // create access token
    const accessToken = generateAccessToken(response._id, role);
    // create refresh token
    const newRefreshToken = generateRefreshToken(response._id);

    // save refresh token in database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    // save refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("Refresh token not provided");
  // remove refresh token in db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // remove refresh token in browser
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout successful",
  });
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? user : "User not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  // get token from cookie
  const cookie = req.cookies;
  // is check token available ?
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  // is check token expire ?
  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);

  jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: result._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Access token not found",
  });
});
// Client send email
// Server check email is valid ?
// Server send mail + link (refresh token)
// Client check email
// Click link
// Client send api + token
// Check token is matching with token of server send mail
// Change password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;

  const data = {
    email,
    html,
    subject: "Forgot password",
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: rs.response?.includes("OK") ? true : false,
    mes: rs.response?.includes("OK")
      ? "Hãy check mail của bạn"
      : "Đã có lỗi, hãy thử lại sau!",
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Misssing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid password reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Update successful" : "Something went wrong",
  });
});
const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email: ${response.email} deleted`
      : "No user delete",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  ).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUserAddress: response ? response : "Something went wrong",
  });
});
const addToCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity | !color) throw new Error("Missing inputs");
  const user = await User.findById(_id).select("cart");
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid
  );
  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const response = await User.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        addToCart: response ? response : "Something went wrong",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: response ? true : false,
        addToCart: response ? response : "Something went wrong",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: response ? true : false,
      addToCart: response ? response : "Something went wrong",
    });
  }
});

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  addToCart,
  registerFinal,
};
