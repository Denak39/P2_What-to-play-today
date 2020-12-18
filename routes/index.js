const express = require("express");
const router = new express.Router();
const GameModel = require("./../models/Game");
const uploader = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectPrivateRoute");
const LibraryModel = require("./../models/Library");

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

router.get("/games", protectAdminRoute, async (req, res, next) => {
  try {
    res.render("games", { games: await GameModel.find() });
  } catch (err) {
    next(err);
  }
});

router.get("/game-add", (req, res) => {
  res.render("game_add");
});

router.post(
  "/game-add",
  protectAdminRoute,
  uploader.single("image"),
  async (req, res, next) => {
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
  }
);

router.get("/games-manage", protectAdminRoute, (req, res, next) => {
  GameModel.find()
    .then((games) => {
      res.render("game_manage", { games });
    })
    .catch(next);
});

router.get("/one-game/:id", protectAdminRoute, (req, res, next) => {
  GameModel.findById(req.params.id)
    .then(async (result) => {
      const playlistId = await LibraryModel.find();
      console.log(playlistId);
      res.render("one_game", { game: result, playlist: playlistId });
    })
    .catch(next);
});

router.get("/delete/:id", protectAdminRoute, async function (req, res, next) {
  try {
    await GameModel.findByIdAndRemove(req.params.id);
    res.redirect("/games-manage");
  } catch (err) {
    next(err);
  }
});

router.get(
  "/game_edit/:id",
  protectAdminRoute,
  async function (req, res, next) {
    try {
      const games = await GameModel.findById(req.params.id);
      console.log(req.params.id);
      res.render("game_edit", games);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/game-edit/:id",
  protectAdminRoute,
  async function (req, res, next) {
    try {
      const updatedOne = await GameModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.redirect("/games-manage");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
