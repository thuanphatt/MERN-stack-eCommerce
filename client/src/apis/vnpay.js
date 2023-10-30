import axios from "../axios";
export const apiCreateVnpay = (data) =>
	axios({
		url: "/payment/vnpay",
		method: "post",
		data,
	});
export const apiReturnVnpay = (data) =>
	axios({
		url: `/payment/vnpay-return?${data}`,
		method: "get",
	});
