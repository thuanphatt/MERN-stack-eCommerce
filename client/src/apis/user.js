import axios from "../axios";
export const apiRegister = (data) =>
	axios({
		url: "/user/register",
		method: "post",
		data,
	});
export const apiFinalRegister = (token) =>
	axios({
		url: "/user/registerfinal/" + token,
		method: "put",
	});
export const apiLogin = (data) =>
	axios({
		url: "/user/login",
		method: "post",
		data,
	});
export const apiForgotPassword = (data) =>
	axios({
		url: "/user/forgotpassword",
		method: "post",
		data,
	});
export const apiResetPassword = (data) =>
	axios({
		url: "/user/resetpassword",
		method: "put",
		data,
	});
export const apiGetCurrent = () =>
	axios({
		url: "/user/current",
		method: "get",
	});

export const apiGetUsers = (params) =>
	axios({
		url: "/user/",
		method: "get",
		params,
	});
export const apiUpdateUser = (data, uid) =>
	axios({
		url: "/user/" + uid,
		method: "put",
		data,
	});
export const apiChangePassword = (data, uid) =>
	axios({
		url: "/user/change-password/" + uid,
		method: "put",
		data,
	});
export const apiDetailUser = (uid) =>
	axios({
		url: "/user/" + uid,
		method: "get",
	});
export const apiDeleteUser = (uid) =>
	axios({
		url: "/user/" + uid,
		method: "delete",
	});
export const apiUpdateCurrent = (data) =>
	axios({
		url: "/user/current",
		method: "put",
		data,
	});
export const apiAddToCart = (data) =>
	axios({
		url: "/user/cart",
		method: "put",
		data,
	});
export const apiAddToWishList = (data) =>
	axios({
		url: "/user/wishlist",
		method: "put",
		data,
	});
export const apiAddToViewedProducts = (data) =>
	axios({
		url: "/user/viewed-products",
		method: "put",
		data,
	});
export const apiRemoveProductInCart = (pid, color) =>
	axios({
		url: `/user/removecart/${pid}/${color}`,
		method: "delete",
	});
export const apiRemoveProductInWishList = (pid, color) =>
	axios({
		url: `/user/removewishlist/${pid}/${color}`,
		method: "delete",
	});
export const apiRemoveProductInViewedProducts = (pid, color) =>
	axios({
		url: `/user/removeviewed-products/${pid}/${color}`,
		method: "delete",
	});
