const express = require("express");

exports.generateRouterModule = (controller, apiPath) => {
	const router = express.Router();
	
	router.get(`${apiPath}`, controller.getAllData);
	router.get(`${apiPath}/:id`, controller.getData);
	router.post(`${apiPath}`, controller.insertData);
	router.put(`${apiPath}/:id`, controller.updateData);
	router.delete(`${apiPath}/:id`, controller.deleteData);

	return router;
};
