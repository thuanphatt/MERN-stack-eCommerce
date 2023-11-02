const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var serviceSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: Array,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		products: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Service", serviceSchema);
