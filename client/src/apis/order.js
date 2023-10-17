import axios from "../axios";

export const apiCreateOrder = (data) =>
	axios({
		url: "/order",
		method: "post",
		data,
	});
export const apiGetBuyHistory = () =>
	axios({
		url: "/order",
		method: "get",
	});
export const apiGetOrders = (params) =>
	axios({
		url: "/order/admin",
		method: "get",
		params,
	});
