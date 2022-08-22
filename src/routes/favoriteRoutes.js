const functions = require("./functions");
const controller = require("../controllers/favoriteController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.favorites}`;
const router = functions.generateRouterModule(controller, apiPath);

router.post(`${apiPath}/match-user-job`, controller.matchUserJob);
router.post(`${apiPath}/unmatch-user-job`, controller.unmatchUserJob);
router.post(`${apiPath}/unmatch-ids`, controller.unmatchByIds);
router.post(`${apiPath}/is-match`, controller.isMatch);
router.post(`${apiPath}/get-by-user`, controller.getByUser);
router.post(`${apiPath}/get-by-job`, controller.getByJob);

module.exports = router;
