const functions = require("./functions");
const controller = require("../controllers/checkoutController");
const collections = require("../config/collections");

const router = functions.generateRouterModule(controller, collections.checkouts);
module.exports = router;
