const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.getUsers = (req, res) => {};

exports.getUserById = (req, res) => {};

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const userInfo = {
        name: req.body.name,
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const user = await User.create(userInfo);
      res.status(201).render("login", { pageName: "login", errors: "" });
    } catch (err) {
      res.status(400).render("login", { pageName: "login", errors: err });
    }
  } else {
    res.status(400).render("login", { pageName: "login", errors });
  }
};

exports.updateUserById = (req, res) => {};
