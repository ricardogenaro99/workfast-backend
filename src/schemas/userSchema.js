const mongoose = require("mongoose");
const collection = require("./../config/collections");

const UserSchema = new mongoose.Schema(
	{
		details: {
			role: {
				type: String,
			},
			email: {
				type: String,
				unique: true,
			},
			password: {
				type: String,
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
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collection.users, UserSchema);
