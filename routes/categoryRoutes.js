const express = require("express");
const { body } = require("express-validator");
const categoryControllers = require("../controllers/categoryControllers");
const Category = require("../models/Category");

const router = express.Router();

router.route("/").get(categoryControllers.getCategories);
router.route("/:id").get(categoryControllers.getCategoryById);
router.route("/").post(
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("The category name can not be empty")
      .custom(async (value, { req }) => {
        const category = await Category.findOne({ name: value });
        if (category) throw new Error("The category name was used!");
        return true;
      }),
  ],
  categoryControllers.createCategory
);
router.route("/:id").put(
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("The category  name can not be epmty")
      .custom(async (value, { req }) => {
        const category = await Category.findOne({ name: value });
        if (category) throw new Error("The category  name was used!");
        return true;
      }),
  ],
  categoryControllers.updateCategoryById
);

router.route("/id").delete(categoryControllers.deleteCategoryById);

module.exports = router;
