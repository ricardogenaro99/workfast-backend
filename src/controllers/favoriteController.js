const schema = require("../schemas/favoriteSchema");
const functions = require("./functions");
const { messages } = require("../messages/messages");

exports.getAllData = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		schema.find({}, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};

exports.getData = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { id } = req.params;
		schema.findOne({ _id: functions.parseId(id) }, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};

exports.updateData = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { id } = req.params;
		const body = req.body;
		schema.updateOne({ _id: functions.parseId(id) }, body, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};

exports.insertData = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const data = req.body;
		schema.create(data, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};

exports.deleteData = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { id } = req.params;
		schema.deleteOne({ _id: functions.parseId(id) }, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};

exports.matchUserJob = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const data = req.body;
		schema.create(data, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({
					message: messages.FAVORITE,
					data: docs,
				});
			}
		});
	});
};

exports.unmatchUserJob = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const data = req.body;
		schema.deleteOne(
			{
				userRef: functions.parseId(data.userRef),
				jobRef: functions.parseId(data.jobRef),
			},
			(err, docs) => {
				if (err) {
					res.status(422).send({ error: err });
				} else {
					res.send({ message: messages.UNFAVORITE, data: docs });
				}
			},
		);
	});
};

exports.unmatchByIds = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { favoritesId } = req.body;
		const favorites = Array.isArray(favoritesId) ? favoritesId : [favoritesId];

		schema.deleteMany({ _id: { $in: favorites } }, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};

exports.isMatch = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { userRef, jobRef } = req.body;
		schema.findOne(
			{
				userRef: functions.parseId(userRef),
				jobRef: functions.parseId(jobRef),
			},
			(err, docs) => {
				if (err) {
					res.status(422).send({ error: err });
				} else {
					res.send({ data: docs });
				}
			},
		);
	});
};

exports.getByUser = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { userRef } = req.body;
		schema
			.find({ userRef: functions.parseId(userRef) }, (err, docs) => {
				if (err) {
					res.status(422).send({ error: err });
				} else {
					res.send({ data: docs });
				}
			})
			.populate({ path: "jobRef", populate: { path: "enterpriseRef" } });
	});
};

exports.getByJob = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { jobRef } = req.body;
		schema.find({ jobRef: functions.parseId(jobRef) }, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};
