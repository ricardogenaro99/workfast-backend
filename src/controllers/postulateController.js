const schema = require("../schemas/postulateSchema");
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

exports.updateData = async (req, res) => {
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

exports.insertData = async (req, res) => {
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

exports.deleteData = async (req, res) => {
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

exports.matchUserJob = async (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const data = req.body;
		schema.findOne(
			{
				userRef: functions.parseId(data.userRef),
				jobRef: functions.parseId(data.jobRef),
			},
			(err, docs) => {
				if (err) {
					res.status(422).send({ error: err });
				} else {
					if (!docs) {
						schema.create(data, (errCreate, docsCreate) => {
							if (errCreate) {
								res.status(422).send({ error: errCreate });
							} else {
								res.send({
									message: messages.POSTULATE_DONE,
									data: docsCreate,
								});
							}
						});
					} else {
						res.send({
							message: messages.POSTULATE_MATCH,
							data: docs,
						});
					}
				}
			},
		);
	});
};

exports.getByUserJob = async (req, res) => {
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

exports.getByUser = async (req, res) => {
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
