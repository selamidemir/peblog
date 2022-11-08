const express = require("express");
const { body } = require("express-validator");
const photoControllers = require("../controllers/photoControllers");
const router = express.Router();


router.route("/:id").get(photoControllers.getPhotoById);
router.route("/").get(photoControllers.getPhotos);
router.route("/").post([
    body("title").trim().not().isEmpty().withMessage("The title can not be empty"),
    body("description").trim(),
    body("file").trim().not().isEmpty().withMessage("Select a photo file please!"),
    body("categories").not().isEmpty().withMessage("Select at least a category"),
    body("tags").not().isEmpty().withMessage("The tags are not empty.")
],
photoControllers.createPhoto);
router.route("/:id").put(photoControllers.updatePhotoById);
router.route("/:id").delete(photoControllers.deletePhotoById);

module.exports = router;
