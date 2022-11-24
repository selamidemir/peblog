const express = require("express");
const { body } = require("express-validator");

const tagController = require("../controllers/tagController");

const router = express.Router();

router.route("/").get(tagController.getTags);
router.route("/:id").get(tagController.getTagById);

module.exports = router;
