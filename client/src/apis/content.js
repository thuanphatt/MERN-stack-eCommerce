import axios from "../axios";
export const apiCreateContent = (data) =>
	axios({
		url: "/content",
		method: "post",
		data,
	});
export const apiGetContents = (params) =>
	axios({
		url: "/content/",
		method: "get",
		params,
	});
export const apiGetContent = (cid) =>
	axios({
		url: "/content/getDetail/" + cid,
		method: "get",
	});
export const apiUpdateContent = (data, cid) =>
	axios({
		url: "/content/" + cid,
		method: "put",
		data,
	});
export const apiDeleteContent = (cid) =>
	axios({
		url: "/content/" + cid,
		method: "delete",
	});
