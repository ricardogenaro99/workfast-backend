const functions = require("./functions");
const controller = require("../controllers/jobController");
const collections = require("../config/collections");

const router = functions.generateRouterModule(controller, collections.jobs);
module.exports = router;
