var express = require("express");
var router = express.Router();

router.get("/settings", (req, res) => {
  res.render("settings", {
    pageTitle: "settings",
    // layout: "layout2",
  });
});
module.exports = router;
