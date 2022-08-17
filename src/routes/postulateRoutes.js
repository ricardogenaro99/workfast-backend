const functions = require("./functions");
const controller = require("../controllers/postulateController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.postulates}`;
const router = functions.generateRouterModule(controller, apiPath);

router.post(`${apiPath}/get-user-job`, controller.getByUserJob);
router.post(`${apiPath}/match-user-job`, controller.matchUserJob);

module.exports = router;
