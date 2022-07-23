const Stripe = require("stripe");
const schema = require("../schemas/checkoutSchema");
const functions = require("./functions");
require("dotenv").config();

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
	functions.reqAuthorization(req, res, async () => {
		const { id, userDb } = await req.body;
		try {
			const docs = await stripe.paymentIntents.create({
				amount: 5 * 100,
				currency: "USD",
				description: "Monthly subscription to WORKFAST",
				payment_method: id,
				confirm: true,
				receipt_email: userDb.details.email,
				metadata: {
					...userDb.details,
					_id: userDb._id,
				},
			});
			res.send({ data: docs });
		} catch (err) {
			res.status(422).send({ error: err });
		}
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
