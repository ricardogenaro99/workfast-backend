const functions = require("./functions");
const controller = require("../controllers/enterpriseController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.enterprises}`;
const router = functions.generateRouterModule(controller, apiPath);

module.exports = router;
