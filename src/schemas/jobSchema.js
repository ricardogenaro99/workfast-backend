const mongoose = require("mongoose");
const collections = require("./../config/collections");
const defaults = require("./defaults");

const JobSchema = new mongoose.Schema(
	{
		details: {
			name: {
				type: String,
			},
			locations: {
				type: [
					{
						city: {
							type: Array,
						},
						country: {
							type: String,
						},
						_id: false,
					},
				],
			},
		},
		enterpiseDetails: {
			name: {
				type: String,
			},
		},
		...defaults.statesDefault,
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.jobs, JobSchema);
