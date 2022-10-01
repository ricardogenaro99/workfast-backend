const mongoose = require("mongoose");

const DB_URI = process.env.MONGODB_URL || "mongodb://localhost:27017/workfastdb";

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
