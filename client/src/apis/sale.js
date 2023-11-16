import axios from "../axios";
export const apiCreateSale = (data) =>
	axios({
		url: "/sale",
		method: "post",
		data,
	});
export const apiGetSales = (params) =>
	axios({
		url: "/sale",
		method: "get",
		params,
	});
export const apiGetSale = (sid) =>
	axios({
		url: "/sale/getDetail/" + sid,
		method: "get",
	});
export const apiUpdateSale = (data, sid) =>
	axios({
		url: "/sale/" + sid,
		method: "put",
		data,
	});
export const apiDeleteSale = (sid) =>
	axios({
		url: "/sale/" + sid,
		method: "delete",
	});
