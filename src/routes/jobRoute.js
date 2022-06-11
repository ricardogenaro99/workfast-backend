const functions = require("./functions");
const controller = require("../controllers/jobController");
const collection = require("../config/collections");

const router = functions.generateRouterModule(controller, collection.jobs);
module.exports = router;
