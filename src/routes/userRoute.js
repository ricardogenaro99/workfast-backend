const functions = require("./functions");
const controller = require("../controllers/userController");
const collections = require("../config/collections");

const router = functions.generateRouterModule(controller, collections.users);
module.exports = router;