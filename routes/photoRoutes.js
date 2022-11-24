const express = require("express");
const { body } = require("express-validator");
const photoController = require("../controllers/photoController");
const router = express.Router();


router.route("/:slug").get(photoController.getPhotoBySlug);
router.route("/").get(photoController.getPhotos);

module.exports = router;
