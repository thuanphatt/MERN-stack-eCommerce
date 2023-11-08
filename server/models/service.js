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
		image: {
			type: String,
			default:
				"https://img.freepik.com/free-photo/overhead-view-coffee-cup-keyboard-camera-paper-white-background_23-2148042112.jpg",
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
