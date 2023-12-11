import axios from "axios";
const instance = axios.create({
	baseURL:
		process.env.REACT_APP_API_URI || "http://192.168.1.6:3000" || "https://mern-stack-e-commerce-eight.vercel.app/api",
});
// Add a request interceptor
instance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		let localStorageDate = window.localStorage.getItem("persist:shop/user");
		if (localStorageDate && typeof localStorageDate === "string") {
			localStorageDate = JSON.parse(localStorageDate);

			const accessToken = JSON.parse(localStorageDate.token);
			config.headers = { authorization: `Bearer ${accessToken}` };
			return config;
		} else return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return error.response?.data;
	}
);
export default instance;
