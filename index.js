const express = require("express");
const initDB = require("./src/config/db");
const cors = require("cors");
const config = require("./src/config/config");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "3001";

const userRouters = require("./src/routes/userRoute");
const jobRouters = require("./src/routes/jobRoute");

app.use(cors(config.application.cors.server));

app.use(
	bodyParser.json({
		limit: "20mb",
	}),
);
app.use(
	bodyParser.urlencoded({
		limit: "20mb",
		extended: true,
	}),
);

app.use(userRouters);
app.use(jobRouters);

app.listen(port, () => {
	console.log("The application is online on port", port);
});

initDB();