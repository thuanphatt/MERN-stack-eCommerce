import axios from "../axios";
export const apiCreateBlogCategory = (data) =>
	axios({
		url: "/blogcategory",
		method: "post",
		data,
	});
export const apiGetBlogCategories = () =>
	axios({
		url: "/blogcategory/",
		method: "get",
	});
export const apiGetBlogCategory = (bcid) =>
	axios({
		url: "/blogcategory/" + bcid,
		method: "get",
	});
export const apiUpdateBlogCategory = (data, bcid) =>
	axios({
		url: "/blogcategory/" + bcid,
		method: "put",
		data,
	});
export const apiDeleteBlogCategory = (bcid) =>
	axios({
		url: "/blogcategory/" + bcid,
		method: "delete",
	});
