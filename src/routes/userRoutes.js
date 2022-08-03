const functions = require("./functions");
const controller = require("../controllers/userController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.users}`;
const router = functions.generateRouterModule(controller, apiPath);

router.post(`${apiPath}/get-user-email`, controller.getUserByEmail);
router.post(`${apiPath}/save-user`, controller.saveUser);
router.post(`${apiPath}/save-details`, controller.saveDetails);
router.post(`${apiPath}/is-favorite-job`, controller.isFavoriteJob);
router.post(`${apiPath}/save-favorite-jobs`, controller.saveFavoriteJobs);

module.exports = router;
