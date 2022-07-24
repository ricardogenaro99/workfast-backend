const functions = require("./functions");
const controller = require("../controllers/userController");
const collections = require("../config/collections");

const router = functions.generateRouterModule(controller, collections.users);

const apiPath = `/api/${collections.users}`;

router.post(`${apiPath}/save-user`, controller.saveUser);
router.post(`${apiPath}/save-details`, controller.saveDetails);
router.post(`${apiPath}/save-favorite-jobs`, controller.saveFavoriteJobs);

module.exports = router;
