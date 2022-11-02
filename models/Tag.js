const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
