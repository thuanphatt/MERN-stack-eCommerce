const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bannerSchema = new mongoose.Schema(
	{
		image: {
			type: String,
			default:
				"https://img.freepik.com/free-photo/overhead-view-coffee-cup-keyboard-camera-paper-white-background_23-2148042112.jpg",
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Banner", bannerSchema);
