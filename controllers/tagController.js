const { validationResult } = require("express-validator");
const Tag = require("../models/Tag");

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(200).send({ tags });
  } catch (err) {
    res.send({ err });
  }
};

exports.getTagById = (req, res) => {};

