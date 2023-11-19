const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var contentSchema = new mongoose.Schema(
	{
		banners: {
			type: Array,
			default:
				"https://img.freepik.com/free-photo/overhead-view-coffee-cup-keyboard-camera-paper-white-background_23-2148042112.jpg",
		},
		bannerSub: {
			type: Array,
			default:
				"https://img.freepik.com/free-photo/overhead-view-coffee-cup-keyboard-camera-paper-white-background_23-2148042112.jpg",
		},
		logo: {
			type: String,
			default:
				"https://img.freepik.com/free-photo/overhead-view-coffee-cup-keyboard-camera-paper-white-background_23-2148042112.jpg",
		},
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Content", contentSchema);
