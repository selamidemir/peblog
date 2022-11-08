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

exports.createTag = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const tag = await Tag.findOne({ name: req.body.name });
      if (!tag) {
        const tagInfo = {
          name: req.body.name,
        };
        const newTag = await Tag.create(tagInfo);
        res.send(newTag);
      } else {
        res.send("The tag was already created.");
      }
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send({
      body: req.body,
      errors,
    });
  }
};

exports.updateTagById = (req, res) => {};

exports.deleteTagById = (req, res) => {};
