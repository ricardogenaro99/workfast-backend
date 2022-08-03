const mongoose = require("mongoose");
const collections = require("../config/collections");
const defaults = require("./defaults");

const EnterpriseSchema = new mongoose.Schema(
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
			image: {
				type: String,
				default: "",
			},
		},
		userRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.users,
			required: true,
		},
		...defaults.statesDefault,
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.enterprises, EnterpriseSchema);
