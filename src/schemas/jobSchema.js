const mongoose = require("mongoose");
const collections = require("./../config/collections");
const defaults = require("./defaults");

const JobSchema = new mongoose.Schema(
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
				default: [],
			},
			image: {
				type: String,
				default: "",
			},
			position: {
				type: String,
				default: "",
			},
		},
		enterpriseRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.enterprises,
		},
		...defaults.statesDefault,
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.jobs, JobSchema);
