const fs = require("fs");
const { validationResult } = require("express-validator");
const { default: slugify } = require("slugify");
const Photo = require("../models/Photo");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

/***** Photos  *****/
exports.listPhotos = async (req, res) => {
  try {
    const tag = await Tag.findOne({ slug: req.query.tag });
    const category = await Category.findOne({ slug: req.query.category });
    const filter = {};
    if (tag) filter.tags = { $in: tag._id };
    if (category) filter.category = category;
    const photos = await Photo.find(filter)
      .sort({ createdAd: "desc" })
      .populate("category")
      .populate("tags");
    const data = photos.map((photo) => [
      photo.file,
      photo.title,
      photo.category,
      photo.slug,
      photo.slug,
    ]);
    res.status(200).render("admin/photos", {
      pageName: "admin-photos",
      data: JSON.stringify(data),
      error: null,
    });
  } catch (err) {
    res.status(400).redirect("/admin");
  }
};

exports.addPhotoForm = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).render("admin/photo_add", {
      pageName: "admin-photo-add",
      photo: null,
      categories,
      error: null,
    });
  } catch (err) {
    res.status(400).redirect("/admin/photos");
  }
};

exports.createPhoto = async (req, res) => {
  const errors = validationResult(req);
  const uploadDir = "public/upload";

  // yükleme yapılacak klasör var mı?
  try {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  } catch (error) {
    const categories = await Category.find({});
    res.status(200).render("admin/photo_add", {
      pageName: "admin-photo-add",
      photo: null,
      categories,
      error: "Some things went wrong.",
    });
  }

  // Girilen form bilgilerinde hata var mı?
  if (errors.isEmpty()) {
    try {
      const uploadFileArr = req.files.image.name.split(".");
      const uploadPath =
        process.cwd() +
        "/" +
        uploadDir +
        "/" +
        slugify(uploadFileArr[0], {
          lower: true,
          strict: true,
        }) +
        "." +
        uploadFileArr[1];

      req.files.image.mv(uploadPath, async (err) => {
        if (err) {
          const categories = await Category.find({});
          res.status(200).render("admin/photo_add", {
            pageName: "admin-photo-add",
            photo: null,
            categories,
            error: "Some things went wrong.",
          });
        }
      });

      const stringTagsArr = req.body.tags.split(",");
      const tags = await Promise.all(
        stringTagsArr.map(async (item) => {
          const tagOne = await Tag.findOne({ name: item });
          if (tagOne) return tagOne;
          else return await Tag.create({ name: item });
        })
      );

      const photoInfo = {
        title: req.body.title,
        description: req.body.description,
        file: req.files.image.name,
        category: req.body.category,
        tags,
      };
      await Photo.create(photoInfo);
      res.status(201).redirect("/admin/photos");
    } catch (err) {
      const categories = await Category.find({});
      res.status(200).render("admin/photo_add", {
        pageName: "admin-photo-add",
        photo: null,
        categories,
        error: "Some things went wrong.",
      });
    }
  } else {
    const categories = await Category.find({});
    res.status(200).render("admin/photo_add", {
      pageName: "admin-photo-add",
      photo: null,
      categories,
      error: errors,
    });
  }
};

exports.editPhotoBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const photo = await Photo.findOne({ slug: slug }).populate("tags");
    const categories = await Category.find({});
    const tags = photo.tags.map((tag) => tag.name);
    if (photo)
      res.status(200).render("admin/photo_edit", {
        pageName: "photo-edit",
        photo,
        categories,
        tags: tags.toString(","),
        error: "",
      });
    else res.status(400).redirect("/admin/photos");
  } catch (err) {
    res.status(400).redirect("/admin/photos");
  }
};

exports.updatePhotoBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const photo = await Photo.findOne({ slug: slug });
    const category = await Category.findById(req.body.category);

    const stringTagsArr = req.body.tags.split(",");
    const tags = await Promise.all(
      stringTagsArr.map(async (item) => {
        const tagOne = await Tag.findOne({ name: item });
        if (tagOne) return tagOne;
        else return await Tag.create({ name: item });
      })
    );

    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.category = category;
    photo.tags = tags;
    photo.save();
    res.status(200).redirect("/admin/photos");
  } catch (err) {
    res.status(400).redirect("/admin/photos");
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const slug = req.params.slug;
    const photo = await Photo.findOne({ slug: slug });
    const filePath = process.cwd() + "/public/upload/" + photo.file;
    fs.unlink(filePath, async (err) => {
      if (err) return res.status(400).redirect("/admin/photos");
      await Photo.findOneAndRemove({ slug: slug });
      res.status(200).redirect("/admin/photos");
    });
  } catch (error) {
    res.send("hata var");
  }
};
/***** Categories *****/
exports.listCategories = async (req, res) => {
  const categories = await Category.find({});

  const data = categories.map((cat) => [
    cat.name,
    cat.slug,
    cat.slug,
    cat.slug,
  ]);
  res.status(200).render("admin/categories", {
    pageName: "admin-categories",
    data: JSON.stringify(data),
    error: null,
  });
};

exports.editCategoryForm = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (category) {
    res.status(200).render("admin/category_edit", {
      pageName: "category-edit",
      category: category,
      error: null,
    });
  } else res.status(400).redirect("/admin/categories");
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (category) {
    category.name = req.body.name;
    category.description = req.body.description;
    category.save();
    res.status(200).redirect("/admin/categories");
  } else {
    const error = "The category was not updated";
    const categoryInfo = {
      name: req.body.name,
      description: req.body.description,
      slug: req.params.slug,
    };
    res.status(400).redirect("/admin/categories/edit/" + req.params.slug, {
      pageName: "category-edit",
      categoryInfo,
      error,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const categoryInfo = {
      name: req.body.name,
      description: req.body.description,
    };
    const category = await Category.create(categoryInfo);
    if (!category) throw new Error("The category could not created.");
    res.status(201).redirect("/admin/categories");
  } catch (err) {
    res.status(400).render("admin/category_add", {
      pageName: "admin-category-add",
      category: {
        name: req.body.name,
        description: req.body.description,
      },
      error: err,
    });
  }
};

exports.addCategoryForm = async (req, res) => {
  res.status(200).render("admin/category_add.ejs", {
    pageName: "admin-add-category",
    category: null,
    error: null,
  });
};

exports.deleteCategory = async (req, res) => {
  const slug = req.params.slug;
  try {
    await Category.findOneAndRemove({ slug: slug });
    res.status(200).redirect("/admin/categories");
  } catch (err) {
    res.status(400).redirect("/admin/categories");
  }
};

/***** Tags *****/
exports.listTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    const data = tags.map((cat) => [cat.name, cat.slug, cat.slug, cat.slug]);
    res.status(200).render("admin/tags", {
      pageName: "admin-tags",
      tags: JSON.stringify(data),
      error: null,
    });
  } catch (err) {
    res.status(400).redirect("/admin");
  }
};

exports.tagEditForm = async (req, res) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug });
    res.status(200).render("admin/tag_edit", {
      pageName: "admin-tag-edit",
      tag: tag,
      error: null,
    });
  } catch (err) {
    res.status(400).redirect("/admin/tags");
  }
};

exports.tagAddForm = (req, res) => {
  res.status(200).render("admin/tag_add", {
    pageName: "admin-tag-add",
    tag: null,
    error: null,
  });
};

exports.createTag = async (req, res) => {
  try {
    const tagInfo = {
      name: req.body.name,
    };
    await Tag.create(tagInfo);
    res.status(201).redirect("/admin/tags");
  } catch (err) {
    res.status(400).render("admin/tag_add", {
      pageName: "admin-tag-add",
      tag: tagInfo,
      error: err,
    });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const tag = await Tag.findOneAndUpdate(
      { slug: req.params.slug },
      { name: req.body.name }
    );
    req.status(200).redirect("/admin/tags");
  } catch {
    res.status(400).redirect("/admin/tags");
  }
};

exports.deleteTag = async (req, res) => {
  try {
    await Tag.findOneAndRemove({ slug: req.params.slug });
    res.status(200).redirect("/admin/tags");
  } catch (err) {
    res.status(400).redirect("/admin/tags");
  }
};
