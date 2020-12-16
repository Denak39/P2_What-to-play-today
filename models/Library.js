const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  name: String, //user
  game: String, //game
});

const LibraryModel = mongoose.model("Library", librarySchema);

module.exports = LibraryModel;
