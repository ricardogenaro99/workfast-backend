const functions = require("./functions");
const controller = require("../controllers/userController");
const collection = require("../config/collections");

const router = functions.generateRouterModule(controller, collection.users);
module.exports = router;