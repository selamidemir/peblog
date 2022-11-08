const { validationResult } = require("express-validator");
const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).send(categories)
    } catch (err) {
        res.send(err)
    }
};

exports.getCategoryById = (req, res) => {};

exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const categoryInfo = {
        name: req.body.name,
        description: req.body.description,
      };
      const category = await Category.create(categoryInfo, { new: true});
      res.status(201).send(category);
    } catch (err) {
      res.status(200).send("The category was not created.");
    }
  } else
    res.send({
      body: req.body,
      errors,
    });
};

exports.updateCategoryById = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const categoryInfo = {
        name: req.body.name,
        description: req.body.description,
      };
      // const category = await Category.findById(req.param.id);
      // category.name = req.body.name;
      // category.description = req.body.description;
      // await category.save();
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        categoryInfo,
        { new: true }
      );
      res.status(200).send(category);
    } catch (err) {
      res.send({
        body: req.body,
        errors,
      });
    }
  } else
    res.send({
      body: req.body,
      errors,
    });
};

exports.deleteCategoryById = (req, res) => {};
