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
				default: "",
			},
			lastname: {
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
		isPremium: {
			type: Boolean,
			default: false,
		},
		profileForm: {},
		jobTags: {
			type: Array,
		},
		jobFavorites: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: collections.jobs,
			},
		],
		jobPostulated: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: collections.jobs,
			},
		],
		...defaults.statesDefault,
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.users, UserSchema);
