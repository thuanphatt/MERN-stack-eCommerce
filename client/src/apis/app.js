import axios from "../axios";
export const apiGetCategories = () => axios({ url: "/prodcategory", method: "get" });
export const apiRemoveCategory = (pcid) => axios({ url: "/prodcategory/" + pcid, method: "delete" });
export const apiUpdateCate = (data, pcid) =>
	axios({
		url: "/prodcategory/" + pcid,
		method: "put",
		data,
	});
export const apiCreateCategory = (data) =>
	axios({
		url: "/prodcategory/",
		method: "post",
		data,
	});
