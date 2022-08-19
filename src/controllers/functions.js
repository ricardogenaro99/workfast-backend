const { firebaseApp } = require("../config/firebase");
const { getAuth } = require("firebase-admin/auth");
const { messages } = require("../messages/messages");
const mongoose = require("mongoose");



exports.parseId = (id) => {
	return mongoose.Types.ObjectId(id);
};

exports.reqAuthorization = async (req, res, callback) => {
	const authorizationRes = await authorization(req);
	if (authorizationRes) {
		try {
			callback();
		} catch (error) {
			console.error("error", error);
		}
	} else {
		res.status(401).send({ error: messages.RES_401 });
	}
};

const authorization = async (req) => {
	try {
		const [,bearer] = req.headers.authorization.split(" ");
		await getAuth(firebaseApp).verifyIdToken(bearer);
		return true;
	} catch (error) {
		return false;
	}
};