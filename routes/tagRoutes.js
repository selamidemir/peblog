const express = require("express");
const { body } = require("express-validator");

const tagController = require("../controllers/tagController");

const router = express.Router();

router.route("/").get(tagController.getTags);
router.route("/:id").get(tagController.getTagById);
router
  .route("/")
  // .post(
  //   [
  //       body("name")
  //       .trim()
  //       .not()
  //       .isEmpty()
  //       .withMessage("Enter tag name please")],
  //   tagController.createTag
  // );
router.route("/:id").put(tagController.updateTagById);
router.route("/:id").delete(tagController.deleteTagById);

module.exports = router;
