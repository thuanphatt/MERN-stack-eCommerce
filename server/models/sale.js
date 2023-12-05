const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var saleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		products: {
			type: Array,
			required: true,
		},
		discount: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

//Export the model
module.exports = mongoose.model("Sale", saleSchema);
