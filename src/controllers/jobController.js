const schema = require("../schemas/jobSchema");
const favoriteSchema = require("../schemas/favoriteSchema");
const postulateSchema = require("../schemas/postulateSchema");
const functions = require("./functions");

exports.getAllData = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		schema
			.find({}, (err, docs) => {
				if (err) {
					res.status(422).send({ error: err });
				} else {
					res.send({ data: docs });
				}
			})
			.populate("enterpriseRef");
	});
};

exports.getData = (req, res) => {
	// functions.reqAuthorization(req, res, () => {
	const { id } = req.params;
	schema
		.findOne({ _id: functions.parseId(id) }, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		})
		.populate("enterpriseRef");
	// });
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

exports.saveJob = (req, res) => {
	const data = req.body;
	schema.create(data, (err, docs) => {
		if (err) {
			res.status(422).send({ error: err });
		} else {
			schema
				.findById(docs?._id, function (errFind, docsFind) {
					if (errFind) {
						res.status(422).send({ error: errFind });
					} else {
						res.send({ data: docsFind });
					}
				})
				.populate("enterpriseRef");
		}
	});
};

exports.getByEnterprise = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { enterpriseRef } = req.body;
		schema
			.find(
				{ enterpriseRef: functions.parseId(enterpriseRef) },
				(err, docs) => {
					if (err) {
						res.status(422).send({ error: err });
					} else {
						res.send({ data: docs });
					}
				},
			)
			.populate("enterpriseRef");
	});
};

exports.deletePackageJob = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { jobId } = req.body;

		favoriteSchema.deleteMany({ jobRef: functions.parseId(jobId) }, (err3) => {
			if (err3) {
				res.status(422).send({ error: err3 });
			} else {
				postulateSchema.deleteMany(
					{ jobRef: functions.parseId(jobId) },
					(err2) => {
						if (err2) {
							res.status(422).send({ error: err2 });
						} else {
							schema.deleteOne(
								{ _id: functions.parseId(jobId) },
								(err, docs) => {
									if (err) {
										res.status(422).send({ error: err });
									} else {
										res.send({ data: docs });
									}
								},
							);
						}
					},
				);
			}
		});
	});
};
