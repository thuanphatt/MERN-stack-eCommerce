import axios from "../axios";
export const apiCreateBanner = (data) =>
	axios({
		url: "/banner",
		method: "post",
		data,
	});
export const apiGetBanners = (params) =>
	axios({
		url: "/banner/",
		method: "get",
		params,
	});
export const apiGetBanner = (bid) =>
	axios({
		url: "/banner/getDetail/" + bid,
		method: "get",
	});
export const apiUpdateBanner = (data, bid) =>
	axios({
		url: "/banner/" + bid,
		method: "put",
		data,
	});
export const apiDeleteBanner = (bid) =>
	axios({
		url: "/banner/" + bid,
		method: "delete",
	});
