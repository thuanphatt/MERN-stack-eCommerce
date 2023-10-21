const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var ShipmentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			uppercase: true,
		},
		cost: {
			type: Number,
			required: true,
		},
		freeship: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Shipment", ShipmentSchema);
