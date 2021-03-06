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
		premium: {
			isPremium: {
				type: Boolean,
				default: false,
			},
			lastPayment: {
				type: Date,
			},
			checkoutId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: collections.checkouts,
			},
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

module.exports = mongoose.model(collections.users, UserSchema);
