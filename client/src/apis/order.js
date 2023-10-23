import axios from "../axios";

export const apiCreateOrder = (data) =>
	axios({
		url: "/order",
		method: "post",
		data,
	});
export const apiGetBuyHistory = (params) =>
	axios({
		url: "/order",
		method: "get",
		params,
	});
export const apiGetOrders = (params) =>
	axios({
		url: "/order/admin",
		method: "get",
		params,
	});
export const apiDeleteOrder = (oid) =>
	axios({
		url: "/order/" + oid,
		method: "delete",
	});
export const apiDetailOrder = (oid) =>
	axios({
		url: "/order/" + oid,
		method: "get",
	});
export const apiUpdateStatus = (oid, data) =>
	axios({
		url: "/order/status/" + oid,
		method: "put",
		data,
	});
