const schema = require("../schemas/userSchema");
const functions = require("./functions");
const moment = require("moment");

const upgradeMembership = (userData) => {
	const { isPremium, lastPayment } = userData.premium;
	if (lastPayment && isPremium) {
		const arrExpiration = moment(lastPayment)
			.add(1, "M")
			.format("YYYY/MM/DD")
			.split("/");

		const arrNow = moment().format("YYYY/MM/DD").split("/");

		for (let index = 0; index < arrExpiration.length; index++) {
			if (arrExpiration[index] < arrNow[index]) {
				const premium = {
					...userData.premium,
					isPremium: false,
				};
				try {
					schema.updateOne(
						{ _id: functions.parseId(userData._id) },
						{ premium },
						(req, res) => {
							console.log(res);
						},
					);
				} catch (error) {
					console.error(error);
				}
				return;
			}
		}
	}
};

// Default controllers
exports.getAllData = (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { email } = req.query;
		const filter = email ? { "details.email": email } : {};
		schema.find(filter, (err, docs) => {
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
				upgradeMembership(docs);
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

// Custom controllers
exports.getUserByEmail = (req, res) => {
	const { email } = req.body;
	schema.find({ "details.email": email }, (err, docs) => {
		if (err) {
			res.status(422).send({ error: err });
		} else {
			res.send({ data: docs });
		}
	});
};

exports.saveUser = async (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const data = req.body;
		data.roleId = data.roleId
			? data.roleId
			: functions.parseId("62eaaa923cdf431757494e6b");
		schema.create(data, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				res.send({ data: docs });
			}
		});
	});
};

exports.saveDetails = async (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { userId, details } = req.body;
		schema.updateOne(
			{ _id: functions.parseId(userId) },
			{ details },
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

exports.isFavoriteJob = async (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { userId, jobId } = req.body;
		schema.findOne({ _id: functions.parseId(userId) }, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				const pos = docs.jobFavorites.findIndex(
					(e) => e.toString() === functions.parseId(jobId).toString(),
				);
				res.send({ data: pos !== -1 });
			}
		});
	});
};

exports.saveFavoriteJobs = async (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { userId, jobId } = req.body;
		schema.findOne({ _id: functions.parseId(userId) }, (err, docs) => {
			if (err) {
				res.status(422).send({ error: err });
			} else {
				let message = "";
				const pos = docs.jobFavorites.findIndex(
					(e) => e.toString() === functions.parseId(jobId).toString(),
				);

				if (pos === -1) {
					docs.jobFavorites.push(functions.parseId(jobId));
					message = "El empleo se agregó a su lista de favoritos";
				} else {
					docs.jobFavorites.splice(pos, 1);
					message = "El empleo se quito a su lista de favoritos";
				}

				schema.updateOne(
					{ _id: functions.parseId(userId) },
					{ jobFavorites: docs.jobFavorites },
					(errUpdate) => {
						if (errUpdate) {
							res.status(422).send({ error: errUpdate });
						} else {
							res.send({ message });
						}
					},
				);
			}
		});
	});
};
