import axios from "../axios";
export const apiCreateService = (data) =>
	axios({
		url: "/service",
		method: "post",
		data,
	});
export const apiGetServices = (params) =>
	axios({
		url: "/service/admin",
		method: "get",
		params,
	});
export const apiGetService = (sid) =>
	axios({
		url: "/service/" + sid,
		method: "get",
	});
export const apiUpdateService = (data, sid) =>
	axios({
		url: "/service/" + sid,
		method: "put",
		data,
	});
export const apiDeleteService = (sid) =>
	axios({
		url: "/service/" + sid,
		method: "delete",
	});
