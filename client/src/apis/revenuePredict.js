import axios from "../axios";
export const apiCreateRevenuePredict = (data) =>
	axios({
		url: "/revenue",
		method: "post",
		data,
	});
export const apiGetRevenuePredict = (params) =>
	axios({
		url: "/revenue/",
		method: "get",
		params,
	});
// export const apiGetBanner = (bid) =>
// 	axios({
// 		url: "/banner/getDetail/" + bid,
// 		method: "get",
// 	});
// export const apiUpdateBanner = (data, bid) =>
// 	axios({
// 		url: "/banner/" + bid,
// 		method: "put",
// 		data,
// 	});
// export const apiDeleteBanner = (bid) =>
// 	axios({
// 		url: "/banner/" + bid,
// 		method: "delete",
// 	});
