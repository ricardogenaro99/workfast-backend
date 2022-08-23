const functions = require("./functions");
const controller = require("../controllers/jobController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.jobs}`;
const router = functions.generateRouterModule(controller, apiPath);

router.post(`${apiPath}/save-job`, controller.saveJob);
router.post(`${apiPath}/get-by-enterprise`, controller.getByEnterprise);
router.post(`${apiPath}/delete-package-job`, controller.deletePackageJob);

module.exports = router;
