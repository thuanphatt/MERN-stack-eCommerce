const Shipment = require("../models/shipment");
const asyncHandler = require("express-async-handler");
const createShipment = asyncHandler(async (req, res) => {
	const { name, cost, freeship } = req.body;
	if (!name || !cost || !freeship) throw new Error("Thông tin đầu vào bị thiếu");
	const response = await Shipment.create(req.body);
	return res.json({
		success: response ? true : false,
		mes: response ? "Tạo phí vận chuyển thành công" : "Không thể tạo phí vận chuyển",
	});
});
const getShipment = asyncHandler(async (req, res) => {
	const response = await Shipment.find();
	return res.json({
		success: response ? true : false,
		shipment: response ? response : "Không thể lấy phí vận chuyển",
	});
});
const updatedShipment = asyncHandler(async (req, res) => {
	const { sid } = req.params;
	const response = await Shipment.findByIdAndUpdate(sid, req.body, {
		new: true,
	});
	return res.json({
		success: response ? true : false,
		mes: response ? "Cập nhật phí vận chuyển thành công" : "Không thể cập nhật phí vận chuyển",
	});
});
const deletedShipment = asyncHandler(async (req, res) => {
	const { cid } = req.params;
	const response = await Shipment.findByIdAndDelete(cid);
	return res.json({
		success: response ? true : false,
		mes: response ? "Đã xóa phí vận chuyển" : "Cannot be deleted coupon",
	});
});

module.exports = {
	createShipment,
	getShipment,
	updatedShipment,
	deletedShipment,
};
