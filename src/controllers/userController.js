const mongoose = require("mongoose");
const schema = require("../schemas/userSchema");

const parseId = (id) => {
	return mongoose.Types.ObjectId(id);
};
/**
 * Obtener DATA de USUARIOS
 */

exports.getAllData = (req, res) => {
	schema.find({}, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};

/**
 * Obtener DATA de USUARIOS
 */

exports.getData = (req, res) => {
	const { id } = req.params;
	schema.findOne({ _id: parseId(id) }, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};

/**
 * Obtener DATA de USUARIOS
 */

exports.updateData = (req, res) => {
	const { id } = req.params;
	const body = req.body;
	schema.updateOne({ _id: parseId(id) }, body, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};

/**
 * Insertar DATA de USUARIOS
 */
exports.insertData = (req, res) => {
	const data = req.body;
	schema.create(data, (err, docs) => {
		if (err) {
			res.status(422).send({ error: "Error" });
		} else {
			res.send({ data: docs });
		}
	});
};

/**
 * Obtener DATA de USUARIOS
 */

exports.deleteData = (req, res) => {
	const { id } = req.params;
	schema.deleteOne({ _id: parseId(id) }, (err, docs) => {
		res.send({
			data: docs,
		});
	});
};
