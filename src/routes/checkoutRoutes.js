const functions = require("./functions");
const controller = require("../controllers/checkoutController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.checkouts}`;
const router = functions.generateRouterModule(controller, apiPath);

module.exports = router;
