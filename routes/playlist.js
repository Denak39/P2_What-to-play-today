const express = require("express");
const router = express.Router();
const LibraryModel = require("./../models/Library");
const UserModel = require("./../models/User");
const uploader = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectPrivateRoute");
const GameModel = require("../models/Game");

// router.get("/playlist", protectAdminRoute, async (req, res, next) => {
//   LibraryModel.find(GameModel)
//     .then((result) => res.render("playlist"))
//     .catch(next);
// });
router.get("/playlist", protectAdminRoute, async (req, res, next) => {
  try {
    res.render("playlist", { games: await LibraryModel.find() });
  } catch (err) {
    next(err);
  }
});
router.get("/userplaylist/:id", protectAdminRoute, async (req, res, next) => {
  // UserModel.findByIdAndUpdate
  LibraryModel.find(req.params.name)
    .then((result) => res.render("userplaylist", { game: result }))
    .catch(next);
});

module.exports = router;