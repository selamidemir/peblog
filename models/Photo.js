const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const Schema = mongoose.Schema;
const PhotoSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  file: {
    type: String,
    trim: true,
    required: true,
    // unique: true,
  },
  slug: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PhotoSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  
  const file = this.file.split(".");
  const fileName = slugify(file[0], {
    lower: true,
    strict: true,
  });
  this.file = `${fileName}.${file[1].toLowerCase()}`;

  this.owner = "63690d3deadb29bc58174519";
  next();
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
