import axios from "../axios";
export const apiCreateShipment = (data) =>
	axios({
		url: "/shipment",
		method: "post",
		data,
	});
export const apiGetShipments = () =>
	axios({
		url: "/shipment",
		method: "get",
	});
export const apiDeleteShipment = (sid) =>
	axios({
		url: "/shipment/" + sid,
		method: "delete",
	});
