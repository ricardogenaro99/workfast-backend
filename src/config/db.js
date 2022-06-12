const mongoose = require("mongoose");

require("dotenv").config();
const DB_URI = process.env.MONGODB_URL;

module.exports = () => {
	const connect = () => {
		mongoose.connect(
			DB_URI,
			{
				keepAlive: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
			(err) => {
				if (err) {
					console.log("DB: ERROR!!", err);
				} else {
					console.log("Correct connection!!");
				}
			},
		);
	};

	connect();
};
