import axios from "../axios";
export const apiGetCoupons = () =>
	axios({
		url: "/coupon",
		method: "get",
	});
