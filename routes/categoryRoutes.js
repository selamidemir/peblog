const express = require("express");
const { body } = require("express-validator");
const categoryController = require("../controllers/categoryController");
const Category = require("../models/Category");

const router = express.Router();

router.route("/").get(categoryController.getCategories);
router.route("/:id").get(categoryController.getCategoryById);
// router.route("/").post(
//   [
//     body("name")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("The category name can not be empty")
//       .custom(async (value, { req }) => {
//         const category = await Category.findOne({ name: value });
//         if (category) throw new Error("The category name was used!");
//         return true;
//       }),
//   ],
//   categoryController.createCategory
// );
router.route("/:id").put(
  // [
  //   body("name")
  //     .trim()
  //     .not()
  //     .isEmpty()
  //     .withMessage("The category  name can not be epmty")
  //     .custom(async (value, { req }) => {
  //       const category = await Category.findOne({ name: value });
  //       if (category) throw new Error("The category  name was used!");
  //       return true;
  //     }),
  // ],
  categoryController.updateCategoryById
);

router.route("/id").delete(categoryController.deleteCategoryById);

module.exports = router;
