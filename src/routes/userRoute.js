const express = require("express");

const controller = require("../controllers/userController");

const router = express.Router();

const path = "users";

router.get(`/${path}`, controller.getAllData);
router.get(`/${path}/:id`, controller.getAllData);
router.post(`/${path}`, controller.insertData);
router.put(`/${path}/:id`, controller.updateData);
router.delete(`/${path}/:id`, controller.deleteData);

module.exports = router;
