const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var revenuePredictSchema = new mongoose.Schema(
	{
		revenues: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Revenue", revenuePredictSchema);
