const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CategorySchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
