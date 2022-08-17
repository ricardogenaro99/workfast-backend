const mongoose = require("mongoose");
const collections = require("../config/collections");

const PostulateSchema = new mongoose.Schema(
	{
		userRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.users,
		},
		jobRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.jobs,
		},
		accepted: {
			type: Boolean,
			default: false,
		},
		refused: {
			type: Boolean,
			default: false,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.postulates, PostulateSchema);
