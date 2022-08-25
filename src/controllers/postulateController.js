const schema = require("../schemas/postulateSchema");
const jobSchema = require("../schemas/jobSchema");
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

exports.matchUserJob = async (req, res) => {
	functions.reqAuthorization(req, res, async () => {
		const data = req.body;

		const find = await schema.findOne({
			userRef: functions.parseId(data.userRef),
			jobRef: functions.parseId(data.jobRef),
		});

		if (!find) {
			schema.create(data, (err, docs) => {
				if (err) {
					res.status(422).send({ error: err });
				} else {
					res.send({
						message: messages.POSTULATE_DONE,
						data: docs,
					});
				}
			});
		} else {
			res.send({
				message: messages.POSTULATE_MATCH,
				data,
			});
		}
	});
};

exports.getByUserJob = (req, res) => {
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

		console.log(userRef);

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
		schema
			.find({ jobRef: functions.parseId(jobRef) }, (err, docs) => {
				if (err) {
					res.status(422).send({ error: err });
				} else {
					res.send({ data: docs });
				}
			})
			.populate(["jobRef", "userRef"]);
	});
};

exports.getByEnterprise = async (req, res) => {
	functions.reqAuthorization(req, res, async () => {
		const { enterpriseRef } = req.body;

		const jobs = await jobSchema
			.find({
				enterpriseRef: functions.parseId(enterpriseRef),
			})
			.select("_id");

		schema
			.find(
				{
					jobRef: { $in: jobs.map((e) => e._id) },
				},
				(err, docs) => {
					if (err) {
						res.status(422).send({ error: err });
					} else {
						res.send({ data: docs });
					}
				},
			)
			.populate(["jobRef", "userRef"]);
	});
};

exports.accepted = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { id } = req.body;
		schema
			.updateOne(
				{ _id: functions.parseId(id) },
				{ accepted: true, refused: false },
				(err, docs) => {
					if (err) {
						res.status(422).send({ error: err });
					} else {
						res.send({ data: docs });
					}
				},
			)
			.populate(["jobRef", "userRef"]);
	});
};

exports.refused = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { id } = req.body;
		schema
			.updateOne(
				{ _id: functions.parseId(id) },
				{ accepted: false, refused: true },
				(err, docs) => {
					if (err) {
						res.status(422).send({ error: err });
					} else {
						res.send({ data: docs });
					}
				},
			)
			.populate(["jobRef", "userRef"]);
	});
};
