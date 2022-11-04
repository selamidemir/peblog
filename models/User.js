const mongoose = require("mongoose");

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
    trim: true
  },
  userName: {
    type: String,
    require:true,
    trim: true
  },
  slug: {
    type: String,
    require: true,
    trim: true
  },
  role: Number
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
