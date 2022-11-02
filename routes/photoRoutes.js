const express = require("express");
const photoControllers = require("../controllers/photoControllers");
const router = express.Router();

router.route("/:id").get(photoControllers.getPhotoById);
router.route("/").get(photoControllers.getPhotos);
router.route("/").post(photoControllers.createPhoto);
router.route("/:id").put(photoControllers.updatePhoto)

module.exports = router;
