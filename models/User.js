const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [{type:Schema.Types.ObjectId, ref:"Game"}]
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
