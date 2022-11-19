const express = require("express");
const { body } = require("express-validator");

const Category = require("../models/Category");
const router = express.Router();

const adminController = require("../controllers/adminController");

/***** Photos *****/
router.route("/photos").get(adminController.listPhotos);
router.route("/photos/add").get(adminController.addPhotoForm);
router.route("/photos").post(
  [
    body("title")
      .trim()
      .not()
      .isEmpty()
      .withMessage("The title can not be empty"),
    body("description").trim(),
    body("category")
      .not()
      .isEmpty()
      .withMessage("Select a category"),
  ],
  adminController.createPhoto
);

/***** Categories *****/
router.route("/categories").get(adminController.listCategories);
router.route("/categories/add").get(adminController.addCategoryForm);
router.route("/categories/add").post(
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
  adminController.createCategory
);
router.route("/categories/edit/:slug").get(adminController.editCategoryForm);
router.route("/categories/edit/:slug").put(
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
  adminController.updateCategory
);
router.route("/categories/:slug").delete(adminController.deleteCategory);

/***** Tags *****/
router.route("/tags").get(adminController.listTags);
router.route("/tags/edit/:slug").get(adminController.tagEditForm);
router.route("/tags/:slug").put(adminController.updateTag);
router.route("/tags/add").get(adminController.tagAddForm);
router
  .route("/tags/")
  .post(
    [body("name").trim().not().isEmpty().withMessage("Enter tag name please")],
    adminController.createTag
  );
router.route("/tags/:slug").delete(adminController.deleteTag);

module.exports = router;
