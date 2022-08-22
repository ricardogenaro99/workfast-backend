const functions = require("./functions");
const controller = require("../controllers/enterpriseController");
const collections = require("../config/collections");

const apiPath = `/api/${collections.enterprises}`;
const router = functions.generateRouterModule(controller, apiPath);

router.post(`${apiPath}/get-by-user`, controller.getEnterpriseByUser);
router.post(`${apiPath}/save-enterprise`, controller.saveEnterprise);
router.post(`${apiPath}/save-details`, controller.saveDetails);

module.exports = router;
