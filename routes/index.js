var express = require("express");
var router = express.Router();
const GameModel = require("./../models/Game");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("toto");
  res.render("home");
});

// GET recommendation page
router.get("/recommendation", (req, res) => {
  res.render("recommendation", {
    pageTitle: "Recommendation",
  });
});

router.get("/games", async (req, res, next) => {
  try {
    res.render("games", { games: await GameModel.find() });
  } catch (err) {
    next(err);
  }
});

router.get("/one-game/:id", async (req, res, next) => {
  GameModel.findById(req.params.id)
    .then((result) => res.render("one_game", { game: result }))
    .catch(next);
});



module.exports = router;
