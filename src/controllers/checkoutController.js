const Stripe = require("stripe");
const schema = require("../schemas/checkoutSchema");
const userSchema = require("../schemas/userSchema");
const functions = require("./functions");

const stripe = new Stripe(process.env.STRIPE_API_KEY);

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

exports.insertData = async (req, res) => {
	functions.reqAuthorization(req, res, async () => {
		const { id, userDb } = await req.body;
		const userId = userDb._id;
		try {
			const stripeData = await stripe.paymentIntents.create({
				amount: 5 * 100,
				currency: "USD",
				description: `Monthly subscription to WORKFAST - ${userId} - ${userDb.details.email}`,
				payment_method: id,
				confirm: true,
				receipt_email: userDb.details.email,
				metadata: {
					...userDb.details,
					_id: userId,
				},
			});

			const data = {
				userRef: userId,
				stripeData,
			};

			schema.create(data, (errCheckout, docsCheckout) => {
				if (errCheckout) {
					res.status(422).send({ error: errCheckout });
				} else {
					const premium = {
						isPremium: true,
						lastPayment: docsCheckout.createdAt,
						checkoutRef: docsCheckout._id,
					};
					userSchema.updateOne(
						{ _id: functions.parseId(userId) },
						{ premium },
						(errUser, docsUser) => {
							if (errUser) {
								res.status(422).send({
									error: { errCheckout, errUser },
								});
							} else {
								res.send({
									data: { docsCheckout, docsUser },
								});
							}
						},
					);
				}
			});
		} catch (err) {
			res.status(422).send({ error: err });
		}
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
