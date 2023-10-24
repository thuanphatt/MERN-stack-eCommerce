import axios from "../axios";
export const apiGetCoupons = () =>
	axios({
		url: "/coupon",
		method: "get",
	});
export const apiGetCoupon = (cid) =>
	axios({
		url: "/coupon/current/" + cid,
		method: "get",
	});
