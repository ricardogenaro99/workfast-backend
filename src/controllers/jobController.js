const mongoose = require("mongoose");
const schema = require("../schemas/jobSchema");

const parseId = (id) => {
	return mongoose.Types.ObjectId(id);
};

exports.getAllData = (req, res) => {
	schema.find({}, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};

exports.getData = (req, res) => {
	const { id } = req.params;
	schema.findOne({ _id: parseId(id) }, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};

exports.updateData = (req, res) => {
	const { id } = req.params;
	const body = req.body;
	schema.updateOne({ _id: parseId(id) }, body, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};

exports.insertData = (req, res) => {
	const data = req.body;
	schema.create(data, (err, docs) => {
		if (err) {
			res.status(422).send({ error: err });
		} else {
			res.send({ data: docs });
		}
	});
};

exports.deleteData = (req, res) => {
	const { id } = req.params;
	schema.deleteOne({ _id: parseId(id) }, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};
