import axios from "../axios";
export const apiGetCoupons = (params) =>
	axios({
		url: "/coupon",
		method: "get",
		params,
	});
export const apiGetCoupon = (cid) =>
	axios({
		url: "/coupon/current/" + cid,
		method: "get",
	});
export const apiDeleteCoupon = (cid) =>
	axios({
		url: "/coupon/" + cid,
		method: "delete",
	});
export const apiCreateCoupon = (data) =>
	axios({
		url: "/coupon/",
		method: "post",
		data,
	});
