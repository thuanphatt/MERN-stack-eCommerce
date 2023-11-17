const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
	{
		products: [
			{
				product: { type: mongoose.Types.ObjectId, ref: "Product" },
				quantity: Number,
				color: String,
				price: Number,
				thumbnail: String,
				title: String,
				sold: Number,
			},
		],
		status: {
			type: String,
			default: "Đang xử lý",
			enum: ["Đã hủy", "Đang xử lý", "Đang giao", "Đã nhận hàng", "Thành công"],
		},
		total: Number,
		coupon: {
			type: mongoose.Types.ObjectId,
			ref: "Coupon",
		},
		orderBy: {
			user: { type: mongoose.Types.ObjectId, ref: "User" },
			firstName: String,
			lastName: String,
			address: Array,
			mobile: String,
			email: String,
			_id: mongoose.Types.ObjectId,
		},
		paymentMethod: {
			type: String,
			default: "COD",
			enum: ["Paypal", "COD", "VNPay"],
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
