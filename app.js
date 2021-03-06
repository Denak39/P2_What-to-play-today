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
const flash = require("connect-flash");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dev_mode = false; //change later

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const settingsRouter = require("./routes/settings");
const playlistRouter = require("./routes/playlist");

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

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 6000000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());
if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // triggers dev mode during dev phase
  app.use(require("./middlewares/debugSessionInfos")); // displays session debug
}
app.use(require("./middlewares/exposeLoginStatus"));

app.use(require("./middlewares/exposeFlashMessage"));

//routes
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/auth", require("./routes/auth"));
app.use("/", settingsRouter);
app.use("/", playlistRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
