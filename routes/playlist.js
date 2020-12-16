const express = require("express");
const router = new express.Router();
const LibraryModel = require("./../models/Library");
const uploader = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectPrivateRoute");

router.get("/playlist", protectAdminRoute, async (req, res, next) => {
  LibraryModel.find("Test")
    .then((result) => res.render("playlist", { game: result }))
    .catch(next);
});

module.exports = router;
