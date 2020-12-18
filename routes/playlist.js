const express = require("express");
const router = express.Router();
const LibraryModel = require("./../models/Library");
const UserModel = require("./../models/User");
const uploader = require("./../config/cloudinary");
const protectRoute = require("./../middlewares/protectPrivateRoute");
const GameModel = require("../models/Game");

// router.get("/playlist", protectAdminRoute, async (req, res, next) => {
//   LibraryModel.find(GameModel)
//     .then((result) => res.render("playlist"))
//     .catch(next);
// });
router.get("/playlist", protectRoute, async (req, res, next) => {
  try {
    res.render("playlist", { users: await UserModel.find() });
  } catch (err) {
    next(err);
  }
});
router.get("/playlistList", protectRoute, async (req, res, next) => {
  try {
    res.render("playlistList", { playlist: await LibraryModel.find() });
  } catch (err) {
    next(err);
  }
});

router.get("/playlist-add", (req, res) => {
  res.render("playlist_add");
});

router.post("/playlist-add", protectRoute, async (req, res, next) => {
  const newPlaylist = { ...req.body };
  console.log(newPlaylist);
  try {
    await LibraryModel.create(newPlaylist);
    res.redirect("/playlistList");
  } catch (err) {
    next(err);
  }
});

router.get("/one-playlist/:id", protectRoute, async (req, res, next) => {
  GameModel.findById(req.params.id)
    .then((result) => res.render("one_playlist", { playlist: result }))
    .catch(next);
});

router.get("/userplaylist/:id", (req, res, next) => {
  UserModel.findById(req.params.id)
    .populate("favorites")
    .then((userFromDb) => {
      res.render("userplaylist", { favorites: userFromDb.favorites });
    })
    .catch(next);
});

router.get("/add-to-favorite/:id", protectRoute, async (req, res, next) => {
  const gameId = req.params.id;
  const userId = req.session.currentUser._id;

  UserModel.findByIdAndUpdate(userId, {
    $addToSet: { favorites: gameId },
  })
    .then(() => {
      res.redirect("/games");
    })
    .catch(next);
});
router.get("/playlistList/:id", (req, res, next) => {
  UserModel.findById(req.params.id)
    .populate("playlists")
    .then((userFromDb) => {
      res.render("playlistList", { playlists: userFromDb.playlists });
    })
    .catch(next);
});

router.get("/add-to-playlist/:id", protectRoute, async (req, res, next) => {
  const gameId = req.params.id;
  const playlistId = req.session.currentUser._id;
  UserModel.findByIdAndUpdate(playlistId, {
    $addToSet: { playlists: gameId },
  })
    .then(() => {
      res.redirect("/playlistList");
    })
    .catch(next);
});

module.exports = router;
