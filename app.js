require("dotenv").config();
require("./config/mongo"); // database initial setup
require("./helpers/hbs"); // utils for hbs templates
// const RawgAPIURL = require("https://rawg.io/api/games");
// const app = express();
// const rawgAPI = new RawgAPIURL();

// const RAWGAPI_REQUEST_HEADERS = {
//   // "X-RawgAPI-Host": "arjunkomath-jaas-json-as-a-service-v1.p.rapidapi.com",
//   "X-RawgAPI-Key": "41b366e5554b479eadd2ade97194736e",
//   "Content-Type": "application/json",
// };

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const settingsRouter = require("./routes/settings");

const app = express();

// view engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
// hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//routes
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", require("./routes/auth"));
app.use("/", settingsRouter);

// app.get("/settings", (req, res) => {
//   res.render("settings", {
//     pageTitle: "settings",
//     layout: "layout2",
//   });
// });

// app.get("/recommend", (req, res) => {
//   res.render("recommend", {
//     pageTitle: "Recommend",
//   });
// });

module.exports = app;
