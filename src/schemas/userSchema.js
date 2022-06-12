const mongoose = require("mongoose");
const collections = require("./../config/collections");
const defaults = require("./defaults");

const UserSchema = new mongoose.Schema(
	{
		details: {
			authId: {
				type: String,
				unique: true,
				required: true,
			},
			role: {
				type: String,
			},
			email: {
				type: String,
				unique: true,
				required: true,
			},
			name: {
				type: String,
			},
			lastname: {
				type: String,
			},
			locations: {
				city: {
					type: String,
				},
				country: {
					type: String,
				},
			},
		},
		jobPreferences: {
			tags: {
				type: Array,
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
		...defaults.statesDefault,
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.users, UserSchema);
