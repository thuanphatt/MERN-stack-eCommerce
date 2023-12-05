import axios from "../axios";

export const apiGetReceipts = (params) =>
	axios({
		url: "/receipt",
		method: "get",
		params,
	});
export const apiGetReceipt = (rid) =>
	axios({
		url: "/receipt/getReceipt/" + rid,
		method: "get",
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
export const apiUpdateReceipt = (data, rid) =>
	axios({
		url: "/receipt/" + rid,
		method: "put",
		data,
	});
