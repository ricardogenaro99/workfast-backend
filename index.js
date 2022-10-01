require("dotenv").config();
const express = require("express");
const initDB = require("./src/config/db");
const cors = require("cors");
const config = require("./src/config/config");
const app = express();
const port = process.env.PORT || "4000";
const routes = require("./src/routes/");

app.use(express.json());

app.use(cors(config.application.cors));

app.all("*", (req, _res, next) => {
	console.log("\nAccessing ...");
	console.info("Request origin =>", req.headers.origin);
	console.info("Request method =>", req.method);
	console.info("Request path =>", req.path);
	console.info("Body =>", req.body);
	try {
		next();
	} catch (err) {
		console.error("Error =>", err);
	}
});

app.use(routes.userRoutes);
app.use(routes.jobRoutes);
app.use(routes.checkoutRoutes);
app.use(routes.roleRoutes);
app.use(routes.enterpriseRoutes);
app.use(routes.postulateRoutes);
app.use(routes.favoriteRoutes);

app.listen(port, () => {
	console.log("The application is online on port:", port);
});

initDB();
