const express = require("express");

exports.generateRouterModule = (controller, path) => {
	const router = express.Router();

	router.get(`/${path}`, controller.getAllData);
	router.get(`/${path}/:id`, controller.getAllData);
	router.post(`/${path}`, controller.insertData);
	router.put(`/${path}/:id`, controller.updateData);
	router.delete(`/${path}/:id`, controller.deleteData);

	return router;
};
