const mongoose = require("mongoose");
const collection = require("./../config/collections");

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
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collection.jobs, JobSchema);
