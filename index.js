const express = require("express");
const initDB = require("./src/config/db");
const cors = require("cors");
const config = require("./src/config/config");
const app = express();
const port = process.env.PORT || "3001";
const routes = require("./src/routes/");

app.use(express.json());

app.use(cors(config.application.cors));

app.use(routes.userRoutes);
app.use(routes.jobRoutes);
app.use(routes.checkoutRoutes);
app.use(routes.roleRoutes);
app.use(routes.enterpriseRoutes);
app.use(routes.postulateRoutes);

app.listen(port, () => {
	console.log("The application is online on port:", port);
});

initDB();
