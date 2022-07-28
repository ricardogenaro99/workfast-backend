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

exports.saveFavoriteJobs = async (req, res) => {
	functions.reqAuthorization(req, res, () => {
		const { userId, jobFavorites } = req.body;
		schema.updateOne(
			{ _id: functions.parseId(userId) },
			{ jobFavorites },
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
