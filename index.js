const express = require("express");
const initDB = require("./src/config/db");
const cors = require("cors");
const config = require("./src/config/config");
const app = express();
const port = process.env.PORT || "3001";

const userRouters = require("./src/routes/userRoute");
const jobRouters = require("./src/routes/jobRoute");
const checkoutRouters = require("./src/routes/checkoutRouter");

app.use(express.json());

app.use(cors(config.application.cors));

app.use(userRouters);
app.use(jobRouters);
app.use(checkoutRouters);

app.listen(port, () => {
	console.log("The application is online on port:", port);
});

initDB();
