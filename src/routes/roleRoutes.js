const functions = require("./functions");
const controller = require("../controllers/roleController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.roles}`;
const router = functions.generateRouterModule(controller, apiPath);

module.exports = router;
