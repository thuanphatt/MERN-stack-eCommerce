import axios from "../axios";

export const apiGetReceipts = (params) =>
	axios({
		url: "/receipt",
		method: "get",
		params,
	});
export const apiCreateReceipt = (data) =>
	axios({
		url: "/receipt",
		method: "post",
		data,
	});
export const apiDeleteReceipt = (rid) =>
	axios({
		url: "/receipt/" + rid,
		method: "delete",
	});
export const apiUpdateReceipt = (rid) =>
	axios({
		url: "/receipt/" + rid,
		method: "put",
	});
