const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const Photo = require("../models/Photo");

exports.getCategoryPhotos = async (req, res) => {
  try {
    const slug = req.params.slug;
    const filter = slug === "all-photos" ? "" : {slug};
    const category = await Category.findOne(filter);
    const photos = await Photo.find({ category: category }).sort("-createdAt");
    res.status(200).render("categories", {
      pageName: "photos-in-category",
      photos,
      error: null,
    });
  } catch (err) {
    res.status(400).redirect("/");
  }
};
