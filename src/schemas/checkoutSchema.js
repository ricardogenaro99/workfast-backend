const mongoose = require("mongoose");
const collections = require("../config/collections");

const CheckoutSchema = new mongoose.Schema(
	{
		userRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.users,
		},
		stripeData: {
			type: Object,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.checkouts, CheckoutSchema);
