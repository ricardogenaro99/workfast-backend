const schema = require("../schemas/postulateSchema");
const functions = require("./functions");

exports.getAllData = (req, res) => {
	schema.find({}, (err, docs) => {
		if (err) {
			res.status(422).send({ error: err });
		} else {
			res.send({ data: docs });
		}
	});
};

exports.getData = (req, res) => {
	const { id } = req.params;
	schema.findOne({ _id: functions.parseId(id) }, (err, docs) => {
		if (err) {
			res.status(422).send({ error: err });
		} else {
			res.send({ data: docs });
		}
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
								message: "Felicidades, esta postulando a este empleo",
								data: docsCreate,
							});
						}
					});
				} else {
					res.send({
						message: "Usted ya esta postulando a este empleo",
						data: docs,
					});
				}
			}
		},
	);
};

exports.getByUserJob = async (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { userId, jobId } = req.body;
		schema.findOne(
			{ userRef: functions.parseId(userId), jobRef: functions.parseId(jobId) },
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
