const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  platform: {
    type: String,
    enum: ["Playstations", "XBOX", "PC", "Switch"],
  },
  description: String,
  image: {
    type: String,
    default: "/images/gamecover.jpg",
  },
  price: Number,
  category: {
    type: String,
    enum: [
      "action",
      "RPG",
      "fighting",
      "shooter",
      "infiltration",
      "horror",
      "adventure",
      "racing",
    ],
  },
  id_tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
  },
});

const GameModel = mongoose.model("Game", gameSchema);

module.exports = GameModel;
