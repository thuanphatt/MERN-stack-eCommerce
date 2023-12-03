const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true, // remove space 2 first and last characters
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		description: {
			type: Array,
			required: true,
		},

		brand: {
			type: String,
			required: true,
		},
		video: {
			type: String,
		},
		thumb: {
			type: String,
		},
		price: {
			type: Number,
		},
		category: {
			type: Array,
			required: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		sold: {
			type: Number,
			default: 0,
		},
		inputPrice: {
			type: Number,
		},
		images: {
			type: Array,
		},
		color: {
			type: String,
			required: true,
		},
		ratings: [
			{
				star: { type: Number },
				postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
				comment: { type: String },
				updatedAt: { type: Date },
			},
		],
		totalRatings: {
			type: Number,
			default: 0,
		},
		varriants: [
			{
				color: String,
				price: Number,
				thumb: String,
				images: Array,
				title: String,
				sku: String,
			},
		],
	},
	{ timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
