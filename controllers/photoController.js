const fs = require("fs");
const { validationResult } = require("express-validator");
const Photo = require("../models/Photo");

exports.getPhotos = async (req, res) => {
  // Tüm resimleri listelemek için kullanılacak
  // İsime göre
  // Kategoriye göre
  // Etiketlere göre
  // Kullanıcıya göre
  // Filtre işlemi yapılmalı
  // Ayrıca sıralama işlemi de olmalı
  const photos = await Photo.find({}).sort("-atCreated").limit(20);
  res.status(200).render("index", {
    pageName: "home",
    photos
  });
};

exports.getPhotoById = async (req, res) => {};

exports.getPhotoBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const photo = await Photo.findOne({ slug });
    res.status(200).send(photo);
  } catch (error) {
    res.status(400).send({ error });
  }
};


exports.updatePhotoBySlug = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const slug = req.params.slug;
      const photoInfo = {
        title: req.body.title,
        description: req.body.description,
        categories: req.body.categories,
        tags: req.body.tags,
      };
      const photo = await Photo.findOneAndUpdate({ slug }, photoInfo, {
        new: true,
      });
      res.send(photo);
    } catch (err) {
      res.send({ err });
    }
  } else {
    res.send({ body: req.body, errors });
  }
};

exports.deletePhotoById = async (req, res) => {
  console.log("burada");
  try {
    const id = req.query.id;
    const result = await Photo.findByIdAndRemove(id);
    res.status(200).redirect("/photos");
  } catch (err) {
    res.status(400).redirect("/photos");
  }
};
