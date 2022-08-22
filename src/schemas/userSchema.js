const mongoose = require("mongoose");
const collections = require("./../config/collections");
const defaults = require("./defaults");

const UserSchema = new mongoose.Schema(
	{
		roleRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.roles,
			required: true,
		},
		details: {
			authId: {
				type: String,
				unique: true,
				required: true,
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
			checkoutRef: {
				type: mongoose.Schema.Types.ObjectId,
				ref: collections.checkouts,
			},
		},

		profileForm: {},
		jobTags: {
			type: Array,
		},
		...defaults.statesDefault,
		isComplete: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.users, UserSchema);
