const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  ref: String,
  size: Number,
  description: String,
  image: {
    type: String,
    default: "/images/gamecover.jpg",
  },
  price: Number,
  category: { type: String, enum: ["men", "women", "kids"] },
  id_tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
  },
});

const GameModel = mongoose.model("Game", gameSchema);

module.exports = GameModel;
