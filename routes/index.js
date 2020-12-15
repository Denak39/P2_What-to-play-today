const express = require("express");
const router = express.Router();
const GameModel = require("./../models/Game");
const uploader = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

/* GET home page. */
router.get("/", function (req, res, next) {
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

router.get("/game-add", (req, res) => {
  res.render("game_add");
});

router.post("/game-add", uploader.single("image"), async (req, res, next) => {
  const newGame = { ...req.body };
  console.log(newGame);
  if (!req.file) {
    newGame.image = undefined;
  } else {
    newGame.image = req.file.path;
  }
  try {
    await GameModel.create(newGame);
    res.redirect("/games");
  } catch (err) {
    next(err);
  }
});

router.get("/games-manage", (req, res, next) => {
  GameModel.find()
    .then((games) => {
      res.render("game_manage", { games });
    })
    .catch(next);
});

router.get("/one-game/:id", async (req, res, next) => {
  GameModel.findById(req.params.id)
    .then((result) => res.render("one_game", { game: result }))
    .catch(next);
});

module.exports = router;
