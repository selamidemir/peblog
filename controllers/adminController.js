const Photo = require("../models/Photo");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

/***** Photos  *****/
exports.listPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort({createdAd: "desc"});

    res.status(200).render("admin/photos", { pageName: "admin-photos", photos});
}


/***** Categories *****/
exports.listCategories = async (req, res) => {
    const categories = await Category.find({});
    const data = categories.map(cat => [cat.name, 0, cat._id, "Delete"]);
    res.status(200).render("admin/categories", { pageName: "admin-categories", categories: JSON.stringify(data)});
}

/***** Tags *****/
exports.listTags = async (req, res) => {
    const tags = await Tag.find({});

    res.status(200).render("admin/tags", { pageName: "admin-tags", tags});
}