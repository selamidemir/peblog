const { validationResult } = require("express-validator");
const Photo = require("../models/Photo");

exports.getPhotos = (req, res) => {
    // Tüm resimleri listelemek için kullanılacak
    // İsime göre
    // Kategoriye göre
    // Etiketlere göre
    // Kullanıcıya göre
    // Filtre işlemi yapılmalı
    // Ayrıca sıralama işlemi de olmalı
};

exports.getPhotoById = (req, res) => {};

exports.createPhoto = async (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()){
    try {
        const photoInfo = {
          title: req.body.title,
          description: req.body.description,
          file: req.body.file,
          categories: req.body.categories,
          tags: req.body.tags,
        };
        const photo = await Photo.create(photoInfo);
        res.status(201).send(photo);
      } catch (err) {
        res.send({ err });
      }
  } else {
    res.send({ body: req.body, errors});
  }
};

exports.updatePhotoById = (req, res) => {};

exports.deletePhotoById = (req, res) => {};
