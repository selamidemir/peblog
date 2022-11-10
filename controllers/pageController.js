const bcrypt = require("bcrypt");
const Photo = require("../models/Photo");
const User = require("../models/User");

exports.getIndexPage = async (req, res) => {
  const photos = await Photo.find({}).sort({ createdAt: "desc" });
  res.status(200).render("index", { pageName: "index", photos });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", { pageName: "about" });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", { pageName: "contact" });
};

exports.getServicesPage = (req, res) => {
  res.status(200).render("services", { pageName: "services" });
};

exports.getLoginForm = (req, res) => {
  if (req.session.userID) res.status(200).redirect("/");
  else res.status(200).render("login", { pageName: "loginForm" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (req.session.userID && user._id === req.session.userID)
    res.status(200).redirect("/");
  if (user && user._id) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        req.session.userID = user._id;
        res.status(200).redirect("/");
      } else {
        const error = "User name or password are wrong";
        res.status(400).render("login", { pageName: "loginForm", error });
      }
    });
  } else {
    const error = "User name or password are wrong";
    res.status(400).render("login", { pageName: "loginForm", error });
  }
};
