const statesDefault = {
	actived: {
		type: Boolean,
		default: false,
		required: true,
	},
	deleted: {
		type: Boolean,
		default: false,
		required: true,
	},
	locked: {
		type: Boolean,
		default: false,
		required: true,
	},
};

module.exports = { statesDefault };
