const mongoose = require("mongoose");
const slugify = require("slugify");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  userName: {
    type: String,
    require: true,
    trim: true,
  },
  slug: {
    type: String,
    require: true,
    trim: true,
  },
  role: String,
});

UserSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified()) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (!err) user.password = hash;
    });
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
