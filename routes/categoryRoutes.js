const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/:slug").get(categoryController.getCategoryPhotos);

module.exports = router;
