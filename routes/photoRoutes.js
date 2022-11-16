const express = require("express");
const { body } = require("express-validator");
const photoController = require("../controllers/photoController");
const router = express.Router();


router.route("/:slug").get(photoController.getPhotoBySlug);
router.route("/").get(photoController.getPhotos);
router.route("/:slug").put([
    body("title").trim().not().isEmpty().withMessage("The title can not be empty"),
    body("description").trim(),
    body("categories").not().isEmpty().withMessage("Select at least a category")
],
photoController.updatePhotoBySlug);
router.route("/").delete(photoController.deletePhotoById);

module.exports = router;
