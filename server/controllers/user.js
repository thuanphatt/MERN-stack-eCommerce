const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const makeToken = require("uniqid");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
const sendMail = require("../utils/sendMail");

const { usersFakeData } = require("../utils/contants");

const register = asyncHandler(async (req, res) => {
	const { email, password, firstName, lastName, mobile } = req.body;
	if (!email || !password || !firstName || !lastName || !mobile)
		return res.status(400).json({
			success: false,
			mes: "Hãy kiểm tra lại thông tin đầu vào",
		});
	const user = await User.findOne({ email });
	if (user) throw new Error("Tài khoản email đã tồn tại");
	else {
		const token = makeToken();
		const emailEdited = btoa(email) + "@" + token;
		const newUser = await User.create({
			email: emailEdited,
			password,
			firstName,
			lastName,
			mobile,
		});
		if (newUser) {
			const html = `<h2>Mã đăng ký: </h2></br><blockquote>${token}</blockquote>`;
			await sendMail({ email, html, subject: "Hoàn tất đăng ký" });
		}
		setTimeout(async () => {
			await User.deleteOne({ email: emailEdited });
		}, [300000]);

		return res.status(200).json({
			success: newUser ? true : false,
			mes: newUser ? "Hãy kiểm tra email để hoàn tất quá trình đăng ký" : "Có lỗi xảy ra, vui lòng thử lại sau!",
		});
	}
});
const registerFinal = asyncHandler(async (req, res) => {
	const { token } = req.params;
	const notActivedEmail = await User.findOne({
		email: new RegExp(`${token}$`),
	});
	if (notActivedEmail) {
		notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0]);
		notActivedEmail.save();
	}
	return res.status(200).json({
		success: notActivedEmail ? true : false,
		mes: notActivedEmail ? "Đăng ký thành công, vui lòng tiến hành đăng nhập." : "Có lỗi xảy ra, vui lòng thử lại sau!",
	});
});
// Refresh token => create new access token
// Access token => Authenticated & Authorization User
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({
			success: false,
			mes: "Thông tin đầu vào bị thiếu",
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
		await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
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
	if (!cookie || !cookie.refreshToken) throw new Error("Refresh token not provided");
	// remove refresh token in db
	await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: "" }, { new: true });
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
	const user = await User.findById(_id)
		.select("-refreshToken -password")
		.populate({
			path: "cart",
			populate: {
				path: "product",
				select: "title thumb price",
			},
		});
	return res.status(200).json({
		success: user ? true : false,
		result: user ? user : "User not found",
	});
});
const refreshAccessToken = asyncHandler(async (req, res) => {
	// get token from cookie
	const cookie = req.cookies;
	// is check token available ?
	if (!cookie && !cookie.refreshToken) throw new Error("No refresh token in cookie");
	// is check token expire ?
	const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);

	jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
	const response = await User.findOne({
		_id: result._id,
		refreshToken: cookie.refreshToken,
	});
	return res.status(200).json({
		success: response ? true : false,
		newAccessToken: response ? generateAccessToken(response._id, response.role) : "Access token not found",
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
		mes: rs.response?.includes("OK") ? "Hãy check mail của bạn" : "Đã có lỗi, hãy thử lại sau!",
	});
});
const resetPassword = asyncHandler(async (req, res) => {
	const { password, token } = req.body;
	if (!password || !token) throw new Error("Misssing inputs");
	const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
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
		mes: user ? "Update successful" : "Đã có lỗi xảy ra",
	});
});
const getUsers = asyncHandler(async (req, res) => {
	const queries = { ...req.query };
	const excludeFields = ["limit", "sort", "page", "fields"];
	excludeFields.forEach((el) => delete queries[el]);
	let queryString = JSON.stringify(queries);
	queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchEl) => `$${matchEl}`);
	const formatedQueries = JSON.parse(queryString);
	if (queries?.name) formatedQueries.name = { $regex: queries.name, $options: "i" };
	if (req.query.q) {
		delete formatedQueries.q;
		formatedQueries["$or"] = [
			{ firstName: { $regex: req.query.q, $options: "i" } },
			{ lastName: { $regex: req.query.q, $options: "i" } },
			{ email: { $regex: req.query.q, $options: "i" } },
			// { mobile: { $regex: req.query.q, $options: "i" } },
		];
	}

	let queryCommand = User.find(formatedQueries);
	if (req.query.sort) {
		const sortBy = req.query.sort?.split(",").join(" ");
		queryCommand = queryCommand.sort(sortBy);
	}
	if (req.query.fields) {
		const fields = req.query.fields?.split(",").join(" ");
		queryCommand = queryCommand.select(fields);
	}

	const page = +req.query.page || 1; // + mean: convert string to number
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS; // number of object after call API
	const skip = (page - 1) * limit;
	queryCommand.skip(skip).limit(limit);
	queryCommand
		.exec()
		.then(async (response) => {
			const counts = await User.find(queries).countDocuments();
			return res.status(200).json({
				success: response ? true : false,
				counts,
				users: response ? response : "Cannot get users",
			});
		})
		.catch((err) => {
			throw new Error(err.message);
		});
});
const deleteUser = asyncHandler(async (req, res) => {
	const { uid } = req.params;
	const response = await User.findByIdAndDelete(uid);
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? `Người dùng với: ${response.email} được xóa thành công` : "Đã có lỗi xảy ra",
	});
});
const updateUser = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { firstName, lastName, email, mobile, address } = req.body;
	const data = { firstName, lastName, email, mobile, address };
	if (req.file) {
		data.avatar = req.file.path;
	}
	if (!_id || Object.keys(req.body).length === 0) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await User.findByIdAndUpdate(_id, data, {
		new: true,
	}).select("-password -role -refreshToken");
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? "Cập nhật thành công" : "Đã có lỗi xảy ra",
	});
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
	const { uid } = req.params;
	if (Object.keys(req.body).length === 0) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await User.findByIdAndUpdate(uid, req.body, {
		new: true,
	}).select("-password -role -refreshToken");
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? "Đã cập nhật thành công" : "Đã có lỗi xảy ra",
	});
});
const updateUserAddress = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	if (!req.body.address) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await User.findByIdAndUpdate(
		_id,
		{ $push: { address: req.body.address } },
		{
			new: true,
		}
	).select("-password -role -refreshToken");
	return res.status(200).json({
		success: response ? true : false,
		updatedUserAddress: response ? response : "Đã có lỗi xảy ra",
	});
});
const addToCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { pid, quantity = 1, color, price, thumbnail, title } = req.body;
	if (!pid || !color) throw new Error("Thông tin đầu vào bị thiếu");
	const user = await User.findById(_id).select("cart");
	const alreadyProduct = user?.cart?.find((el) => el.product.toString() === pid && el.color === color);
	if (alreadyProduct) {
		const response = await User.updateOne(
			{ cart: { $elemMatch: alreadyProduct } },
			{
				$set: {
					"cart.$.quantity": quantity,
					"cart.$.color": color,
					"cart.$.thumbnail": thumbnail,
					"cart.$.title": title,
				},
			},
			{ new: true }
		);
		return res.status(200).json({
			success: response ? true : false,
			mes: response ? "Đã thêm giỏ hàng thành công" : "Đã có lỗi xảy ra",
		});
	} else {
		const response = await User.findByIdAndUpdate(
			_id,
			{ $push: { cart: { product: pid, quantity, color, price, thumbnail, title } } },
			{
				new: true,
			}
		);
		return res.status(200).json({
			success: response ? true : false,
			mes: response ? "Đã thêm giỏ hàng thành công" : "Đã có lỗi xảy ra",
		});
	}
});
const removeProductInCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { pid, color } = req.params;
	const user = await User.findById(_id).select("cart");
	const alreadyProduct = user?.cart?.find((el) => el.product.toString() === pid && el.color === color);
	if (!alreadyProduct) {
		return res.status(200).json({
			success: true,
			mes: "Đã thêm giỏ hàng thành công",
		});
	}
	const response = await User.findByIdAndUpdate(
		_id,
		{ $pull: { cart: { product: pid, color } } },
		{
			new: true,
		}
	);
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? "Đã xóa khỏi giỏ hàng thành công" : "Đã có lỗi xảy ra",
	});
});
const removeProductInWishList = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { pid, color } = req.params;
	const user = await User.findById(_id).select("wishList");
	const alreadyProduct = user?.wishList?.find((el) => el.product.toString() === pid && el.color === color);
	if (!alreadyProduct) {
		return res.status(200).json({
			success: true,
			mes: "Đã thêm danh sách yêu thích thành công",
		});
	}
	const response = await User.findByIdAndUpdate(
		_id,
		{ $pull: { wishList: { product: pid, color } } },
		{
			new: true,
		}
	);
	return res.status(200).json({
		success: response ? true : false,
		mes: response ? "Đã xóa khỏi danh sách yêu thích thành công" : "Đã có lỗi xảy ra",
	});
});

const addToWishList = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { pid, quantity = 1, color, price, thumbnail, title } = req.body;
	if (!pid || !color) throw new Error("Thông tin đầu vào bị thiếu");
	const user = await User.findById(_id).select("wishList");
	const alreadyProduct = user?.wishList?.find((el) => el.product.toString() === pid && el.color === color);
	if (alreadyProduct) {
		const response = await User.updateOne(
			{ wishList: { $elemMatch: alreadyProduct } },
			{
				$set: {
					"wishList.$.quantity": quantity,
					"wishList.$.color": color,
					"wishList.$.thumbnail": thumbnail,
					"wishList.$.title": title,
				},
			},
			{ new: true }
		);
		return res.status(200).json({
			success: response ? true : false,
			mes: response ? "Đã thêm sản phẩm vào danh sách thành công" : "Đã có lỗi xảy ra",
		});
	} else {
		const response = await User.findByIdAndUpdate(
			_id,
			{ $push: { wishList: { product: pid, quantity, color, price, thumbnail, title } } },
			{
				new: true,
			}
		);
		return res.status(200).json({
			success: response ? true : false,
			mes: response ? "Đã thêm sản phẩm vào danh sách thành công" : "Đã có lỗi xảy ra",
		});
	}
});
const createUsers = asyncHandler(async (req, res) => {
	const response = await User.create(usersFakeData);
	return res.status(200).json({
		success: response ? true : false,
		users: response ? response : "Đã có lỗi xảy ra",
	});
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
	createUsers,
	removeProductInCart,
	addToWishList,
	removeProductInWishList,
};
