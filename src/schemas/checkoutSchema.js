const mongoose = require("mongoose");
const collections = require("../config/collections");
const defaults = require("./defaults");

const CheckoutSchema = new mongoose.Schema(
	{
		details: {
			name: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				default: "",
			},
			country: {
				type: String,
				default: "",
			},
			tags: {
				type: Array,
			},
		},
		enterpiseDetails: {
			name: {
				type: String,
				default: "",
			},
			city: {
				type: String,
				default: "",
			},
			country: {
				type: String,
				default: "",
			},
		},
		...defaults.statesDefault,
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.checkouts, CheckoutSchema);
