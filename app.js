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

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
app.use("/", require("./routes/index"));
app.use("/", require("./routes/users"));
app.use("/", require("./routes/auth"));

module.exports = app;
