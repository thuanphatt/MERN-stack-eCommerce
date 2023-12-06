const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var receiptSchema = new mongoose.Schema(
	{
		products: {
			product: { type: mongoose.Types.ObjectId, ref: "Product" },
			title: String,
			thumb: String,
			_id: mongoose.Types.ObjectId,
		},
		inputPrice: {
			type: Number,
			required: true,
		},
		inputName: {
			user: { type: mongoose.Types.ObjectId, ref: "User" },
			firstName: String,
			lastName: String,
		},
		inputQuantity: {
			type: Number,
			required: true,
		},
		soldoutQuantity: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("Receipt", receiptSchema);
