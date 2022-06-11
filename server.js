const express = require("express");
const initDB = require("./src/config/db");
const cors = require("cors");
const config = require("./src/config/config");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

const userRouters = require("./src/routes/userRoute");

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

app.listen(port, () => {
	console.log("The application is online");
});

initDB();
