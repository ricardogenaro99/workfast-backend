const mongoose = require("mongoose");
const collections = require("../config/collections");

const FavoriteSchema = new mongoose.Schema(
	{
		userRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.users,
		},
		jobRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: collections.jobs,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model(collections.favorites, FavoriteSchema);
