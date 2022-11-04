const express = require("express");
const categoryControllers = require("../controllers/categoryControllers");

const router = express.Router();

router.route("/").get(categoryControllers.getCategories);
router.route("/:id").get(categoryControllers.getCategoryById);
router.route("/").post(categoryControllers.createCategory);
router.route("/:id").put(categoryControllers.updateCategoryById);
router.route("/id").delete(categoryControllers.deleteCategoryById);

module.exports = router;
