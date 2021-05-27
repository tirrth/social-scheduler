require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var app = express();
const cron = require("node-cron");
const axios = require("axios");
const { keepServerAlive } = require("./util");
const { automateInstagramStory } = require("./instagram");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// global.instagramSession = [
//   {
//     name: "rur",
//     value: "ASH",
//     domain: ".instagram.com",
//     path: "/",
//     expires: -1,
//     size: 6,
//     httpOnly: true,
//     secure: true,
//     session: true,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "shbid",
//     value: "19630",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1622601125.150801,
//     size: 10,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "shbts",
//     value: "1621996325.068131",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1622601125.150846,
//     size: 22,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "sessionid",
//     value: "35637751930%3AMTXJgLfSkFT8vX%3A17",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1653532324.232554,
//     size: 42,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "ds_user_id",
//     value: "35637751930",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1629772326.481575,
//     size: 21,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "ig_did",
//     value: "E531589C-FA49-4B26-AE33-B11A0FED9FF4",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1685068319.596242,
//     size: 42,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "mid",
//     value: "YK2zHwAAAAHGtoCQUfp83yol6Yq6",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1685068319.596192,
//     size: 31,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "csrftoken",
//     value: "3DOSUxY2ZnpLLVDcnx4sGsxOxuKU6HHP",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1653445926.481459,
//     size: 41,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "ig_nrcb",
//     value: "1",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1653532319.596277,
//     size: 8,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameSite: "None",
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
// ];

// automateInstagramStory();
ffmpeg.ffprobe(
  path.relative(process.cwd(), __dirname + "/public/images/") + "/file.mp4",
  (err, metadata) => {
    console.log("err =", err);
    console.log("metadata =", metadata);
    ffmpeg((process.cwd(), __dirname + "/public/images/") + "/file.mp4")
      .setStartTime("00:00:00")
      .setDuration(15)
      .output((process.cwd(), __dirname + "/public/images/") + "/file1.mp4")
      .on("end", (err) => {
        if (err) return console.log("Err: ", err);
        console.log("Conversion Done");
      })
      .on("error", (err) => console.log(err))
      .run();
  }
);
axios
  .get("https://www.instagram.com/fuckjerry?__a=1")
  .then((res) => {
    console.log("res =", res);
    const { data } = res;
    console.log("data =", data);
    const edges = data?.graphql?.user?.edge_owner_to_timeline_media?.edges;
    if (!Array.isArray(edges)) return;
    const random_edge_no = generateRandomInteger(0, edges.length - 1);
    return edges[random_edge_no];
  })
  .catch((err) => {
    console.log("Error ===============================");
    console.log(err);
  });
cron.schedule("0 */20 * * * *", keepServerAlive); // ping to the server every 20 minutes
cron.schedule("0 0 */1 * * *", automateInstagramStory); // upload a new instagram story every one hour

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

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

module.exports = app;
