const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
