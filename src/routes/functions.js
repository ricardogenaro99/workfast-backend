const express = require("express");

exports.generateRouterModule = (controller, path) => {
	const router = express.Router();
	const apiPath = `/api/${path}`;
	
	router.get(`${apiPath}`, controller.getAllData);
	router.get(`${apiPath}/:id`, controller.getData);
	router.post(`${apiPath}`, controller.insertData);
	router.put(`${apiPath}/:id`, controller.updateData);
	router.delete(`${apiPath}/:id`, controller.deleteData);

	return router;
};
