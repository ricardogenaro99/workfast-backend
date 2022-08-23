const schema = require("../schemas/jobSchema");
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
	functions.reqAuthorization(req, res, () => {
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

exports.saveJob = async (req, res) => {
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

exports.getByEnterprise = async (req, res) => {
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
