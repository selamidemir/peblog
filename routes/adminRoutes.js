const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController")

/***** Photos *****/
router.route("/photos").get(adminController.listPhotos);

/***** Categories *****/
router.route("/categories").get(adminController.listCategories);
router.route("/categories/edit/:slug").get(adminController.editCategory);

/***** Tags *****/
router.route("/tags").get(adminController.listTags);

module.exports = router;