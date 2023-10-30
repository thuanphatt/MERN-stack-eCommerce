import axios from "../axios";
export const apiCreateBlog = (data) =>
	axios({
		url: "/blog",
		method: "post",
		data,
	});
export const apiGetBlogs = (params) =>
	axios({
		url: "/blog/getBlogs",
		method: "get",
		params,
	});
export const apiGetBlog = (bid) =>
	axios({
		url: "/blog/getBlog/" + bid,
		method: "get",
	});
export const apiUpdateBlog = (data, bid) =>
	axios({
		url: "/blog/" + bid,
		method: "put",
		data,
	});
export const apiDeleteBlog = (bid) =>
	axios({
		url: "/blog/" + bid,
		method: "delete",
	});

export const apiLikeBlog = (bid) =>
	axios({
		url: "/blog/like/" + bid,
		method: "put",
	});
export const apiDisLikeBlog = (bid) =>
	axios({
		url: "/blog/dislike/" + bid,
		method: "put",
	});
