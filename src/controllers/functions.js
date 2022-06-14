const { firebaseApp } = require("../config/firebase");
const { getAuth } = require("firebase-admin/auth");
const { messages } = require("../messages/messages");

authorization = async (req) => {
	try {
		const bearer = req.headers.authorization.split(" ")[1];
		await getAuth(firebaseApp).verifyIdToken(bearer);
		return true;
	} catch (error) {
		return false;
	}
};

exports.parseId = (id) => {
	return mongoose.Types.ObjectId(id);
};

exports.reqAuthorization = async (req, res, callback) => {
	const authorizationRes = await authorization(req);
	if (authorizationRes) {
		callback();
	} else {
		res.status(401).send({ error: messages.RES_401 });
	}
};
