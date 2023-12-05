const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
		},
		mobile: {
			type: String,
			unique: true,
			require: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: [2000, 2001],
			default: 2000,
		},
		cart: [
			{
				product: { type: mongoose.Types.ObjectId, ref: "Product" },
				quantity: Number,
				color: String,
				price: Number,
				thumbnail: String,
				title: String,
				inputPrice: Number,
				idReceipt: { type: mongoose.Types.ObjectId, ref: "Receipt" },
			},
		],
		address: { type: Array, default: [] },
		wishList: [
			{
				product: { type: mongoose.Types.ObjectId, ref: "Product" },
				quantity: Number,
				color: String,
				price: Number,
				thumbnail: String,
				title: String,
			},
		],
		viewedProducts: [
			{
				product: { type: mongoose.Types.ObjectId, ref: "Product" },
				quantity: Number,
				color: String,
				price: Number,
				thumbnail: String,
				title: String,
				sold: Number,
				totalRatings: Number,
				category: Array,
			},
		],
		isBlocked: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
		},
		passwordChangedAt: {
			type: String,
		},
		passwordResetToken: {
			type: String,
		},
		passwordResetExpires: {
			type: String,
		},
		registerToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
// hash password before register
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = bcrypt.genSaltSync(10);
	this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods = {
	isCorrectPassword: async function (password) {
		return await bcrypt.compare(password, this.password);
	},
	createPasswordChangedToken: function () {
		const resetToken = crypto.randomBytes(32).toString("hex");
		this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
		this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
		return resetToken;
	},
};
//Export the model
module.exports = mongoose.model("User", userSchema);
