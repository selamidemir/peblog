const express = require("express");
const { body } = require("express-validator");

const Category = require("../models/Category");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

/***** Photos *****/
router.route("/photos").get(authMiddleware, adminController.listPhotos);
router.route("/photos/add").get(authMiddleware, adminController.addPhotoForm);
router.route("/photos").post(
  authMiddleware, 
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
router.route("/photos/:slug").delete(authMiddleware, adminController.deletePhoto)

/***** Categories *****/
router.route("/categories").get(authMiddleware, adminController.listCategories);
router.route("/categories/add").get(authMiddleware, adminController.addCategoryForm);
router.route("/categories/add").post(
  authMiddleware, 
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
router.route("/categories/edit/:slug").get(authMiddleware, adminController.editCategoryForm);
router.route("/categories/edit/:slug").put(
  authMiddleware, 
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
router.route("/categories/:slug").delete(authMiddleware, adminController.deleteCategory);

/***** Tags *****/
router.route("/tags").get(authMiddleware, adminController.listTags);
router.route("/tags/edit/:slug").get(authMiddleware, adminController.tagEditForm);
router.route("/tags/:slug").put(authMiddleware, adminController.updateTag);
router.route("/tags/add").get(authMiddleware, adminController.tagAddForm);
router
  .route("/tags/")
  .post(
    authMiddleware, 
    [body("name").trim().not().isEmpty().withMessage("Enter tag name please")],
    adminController.createTag
  );
router.route("/tags/:slug").delete(authMiddleware, adminController.deleteTag);

module.exports = router;
