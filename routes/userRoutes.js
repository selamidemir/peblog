const express = require("express");
const { body } = require("express-validator");
const UserRoles = require("../assets/userRoles");
const User = require("../models/User");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router.route("/").get(userControllers.getUsers);
router.route("/:id").get(userControllers.getUserById);
router.route("/").post(
  [
    body("name").not().isEmpty().withMessage("Please enter your name."),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Plase enter your email address.")
      .isEmail()
      .withMessage("Plase enter correct email address.")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) throw new Error("This email has already been used.");
        return true;
      }),
    body("username").not().isEmpty().withMessage("The user name can not be empty"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("The password can not be empty")
      .isLength({ min: 5 })
      .withMessage("The password length must be bigger than 5"),
    body("password-confirm")
      .not()
      .isEmpty()
      .isLength({ min: 5 })
      .custom((value, { req }) => {
        if (req.body.password !== value)
          throw new Error("Password confirmation does not match password");
        return true;
      }),
    body("role")
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        const result = Object.values(UserRoles).includes(value);
        if (!result) throw new Error("Select user role please");
        return true;
      }),
  ],
  userControllers.createUser
);
router.route("/:d").put(userControllers.updateUserById);
router.route("/:id").delete(userControllers.deleteUserById);
router.route("/:id").get(userControllers.activateUserById);

module.exports = router;
