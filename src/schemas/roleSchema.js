const mongoose = require("mongoose");
const collections = require("../config/collections");
const defaults = require("./defaults");

const RoleSchema = new mongoose.Schema(
	{
		// recruiter, candidate
		values: [
			{
				type: String,
				required: true,
			},
		],
		...defaults.statesDefault,
		actived: {
			type: Boolean,
			default: true,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.roles, RoleSchema);
