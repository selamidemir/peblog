const Photo = require("../models/Photo");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

/***** Photos  *****/
exports.listPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort({ createdAd: "desc" }).populate('categories').populate('tags');
  const data = photos.map((photo) => [
    photo.title,
    photo.categories,
    photo.tags
  ]);
  res.status(200).render("admin/photos", { 
    pageName: "admin-photos", 
    data: JSON.stringify(data),
    error: null, });
};

exports.addPhotoForm = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).render("admin/photo_add", { 
      pageName: "admin-photo-add",
      photo: null,
      categories,
      error: null
    });
  } catch (err) {
    res.status(400).redirect("/admin/photos");
  }

}


exports.createPhoto = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
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
    res.send({ body: req.body, errors });
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
    categories: JSON.stringify(data),
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
