const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/contact").get(pageController.getContactPage);
router.route("/services").get(pageController.getServicesPage);
router.route("/login").get(pageController.getLoginForm);
router.route("/login").post(pageController.loginUser);

module.exports = router;
