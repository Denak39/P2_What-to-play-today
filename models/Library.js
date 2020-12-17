const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  name: String,
  platform: ["Playstations", "Xbox", "PC", "Switch"],
  category: [
    "action",
    "RPG",
    "fighting",
    "shooter",
    "infiltration",
    "horror",
    "adventure",
    "racing",
  ],
  description: String,
  // owner: {type: Schema.Types.ObjectId, ref:"User"}, //user
  // game: [{type:Schema.Types.ObjectId, ref:"Game"}], //game
});

const LibraryModel = mongoose.model("Library", librarySchema);

module.exports = LibraryModel;
