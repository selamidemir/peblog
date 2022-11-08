const express = require("express");
const { body } = require("express-validator");

const tagControllers = require("../controllers/tagControllers");

const router = express.Router();

router.route("/").get(tagControllers.getTags);
router.route("/:id").get(tagControllers.getTagById);
router
  .route("/")
  .post(
    [
        body("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Enter tag name please")],
    tagControllers.createTag
  );
router.route("/:id").put(tagControllers.updateTagById);
router.route("/:id").delete(tagControllers.deleteTagById);

module.exports = router;
