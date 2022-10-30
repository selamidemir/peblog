const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
