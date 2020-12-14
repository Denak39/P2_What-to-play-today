var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/games", async (req, res, next) => {
  try {
    res.render("games", { games: await GameModel.find() });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
