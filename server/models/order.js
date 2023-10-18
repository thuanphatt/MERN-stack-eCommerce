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
			},
		],
		status: {
			type: String,
			default: "Đang xử lý",
			enum: ["Đã hủy", "Đang xử lý", "Thành công"],
		},
		total: Number,
		coupon: {
			type: mongoose.Types.ObjectId,
			ref: "Coupon",
		},
		orderBy: {
			user: { type: mongoose.Types.ObjectId, ref: "user" },
			firstName: String,
			lastName: String,
			address: Array,
			mobile: String,
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
