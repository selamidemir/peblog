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
        role: req.body.role,
      };
      const user = await User.create(userInfo);
      res.status(201).send(user);
    } catch (err) {
      res.status().send("The user was not created");
    }
  } else res.status(200).send({ body: req.body, errors });
};

exports.activateUserById = (req, res) => {};

exports.updateUserById = (req, res) => {};

exports.deleteUserById = (req, res) => {};


