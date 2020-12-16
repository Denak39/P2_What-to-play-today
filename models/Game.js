const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  platform: ["Playstations", "Xbox", "PC", "Switch"],
  description: String,
  image: {
    type: String,
    default: "/images/gamecover.jpg",
  },
  price: Number,
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
});

const GameModel = mongoose.model("Game", gameSchema);

module.exports = GameModel;
