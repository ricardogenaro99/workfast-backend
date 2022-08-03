const express = require("express");
const initDB = require("./src/config/db");
const cors = require("cors");
const config = require("./src/config/config");
const app = express();
const port = process.env.PORT || "3001";

const userRoutes = require("./src/routes/userRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const checkoutRoutes = require("./src/routes/checkoutRoutes");
const roleRoutes = require("./src/routes/roleRoutes");
const enterpriseRoutes = require("./src/routes/enterpriseRoutes");
app.use(express.json());

app.use(cors(config.application.cors));

app.use(userRoutes);
app.use(jobRoutes);
app.use(checkoutRoutes);
app.use(roleRoutes);
app.use(enterpriseRoutes);

app.listen(port, () => {
	console.log("The application is online on port:", port);
});

initDB();
