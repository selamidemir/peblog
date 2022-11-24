const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(categoryController.getCategories);
router.route("/:id").get(categoryController.getCategoryById);


module.exports = router;
