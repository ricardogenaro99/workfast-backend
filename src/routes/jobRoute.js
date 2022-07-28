const functions = require("./functions");
const controller = require("../controllers/jobController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.jobs}`;
const router = functions.generateRouterModule(controller, apiPath);

module.exports = router;
