require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var app = express();
const cron = require("node-cron");
const InstagramPuppet = require("./instagram");
const { generateRandomInteger } = require("./util");

const memes = [
  "meme.ig",
  "fuckjerry",
  "sarcasm_only",
  "daquan",
  "thefatjewish",
  "lmao",
  "funnymemes",
  "nbamemes",
  "memes",
  "memezar",
  "lil_funny_memess",
];

const motivational = [
  "6amsuccess",
  "motivationmafia",
  "foundr",
  "addicted2success",
  "quoteoftheday",
  "quotes",
  "positivevibesquotes",
  "gangsters.quotes",
  "poetry",
  "humblethepoet",
  "visionofsuccess",
];

const cute_animals = [
  "cute_animalvideos",
  "cute.animals",
  "jiffpom",
  "pumpkintheraccoon",
  "this_girl_is_a_squirrel",
  "hamilton_the_hipster_cat",
  "reagandoodle",
  "juniperfoxx",
  "nala_cat",
  "lizzie.bear",
];

const knowledge = [
  "educating.facts",
  "amazing_.facts._",
  "knowledge__iq",
  "knowledge.hack",
  "knowledge4genius",
  "#facts",
  "psychologyfact_",
  "facts_and_science",
  "science_facts_07",
  "facts.trend",
];

const nature = [
  "nature",
  "#nature",
  "#naturephotography",
  "nature.geography",
  "discovery",
  "#naturegeography",
  "nature._.videos",
];

const _getInstagramPageCategory = () => {
  const categories = [memes, motivational, cute_animals, knowledge, nature];
  const random_category_no = generateRandomInteger(0, categories.length - 1);
  return categories[random_category_no];
};

const _getRandomPage = () => {
  const instagram_page = _getInstagramPageCategory();
  const random_page_no = generateRandomInteger(0, instagram_page.length - 1);
  const random_page = `${instagram_page[random_page_no]}`;
  return random_page;
};

const automateInstagramStory = async () => {
  const fallback_image = `https://thumbs.dreamstime.com/b/computer-error-box-funny-fake-message-i-speechless-original-design-error-box-i-speechless-197648494.jpg`;
  const fallback_err = "Error while processing!";
  const _uploadStoryFromUrl = (story_url, is_video) => {
    ig.uploadStoryFromUrl(story_url, {
      is_video,
      callback: async (resp) => {
        !resp.success && console.log(resp?.error || fallback_err);
        await ig.exit();
      },
    });
  };
  const navigateToPage = _getRandomPage();
  const ig = new InstagramPuppet();
  ig.setBaseDir(path.relative(process.cwd(), __dirname + "/public/files/"));
  ig.setFallbackImage(fallback_image);
  await ig.initialize();
  const { CLIENT_ID, SECRET_KEY } = process.env;
  await ig.login(CLIENT_ID, SECRET_KEY);
  ig.getRandomPostFromPage(navigateToPage)
    .then((resp) => {
      const is_video = !!resp?.node?.is_video;
      const story_url = resp?.node?.[!is_video ? "display_url" : "video_url"];
      _uploadStoryFromUrl(story_url, is_video);
    })
    .catch((err) => {
      console.log(err || fallback_err);
      _uploadStoryFromUrl(null, null);
    });
};

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
// const durations = [];
// const _toLocalString = (number) => {
//   return number.toLocaleString("en-US", {
//     minimumIntegerDigits: 2,
//     useGrouping: false,
//   });
// };
// for (var i = 0, j = 0, k = 0, l = 0; i <= 3600; i += 15) {
//   if (i && i % 60 === 0) (j = 0), k++;
//   else if (i && i % 3600 === 0) (j = 0), l++;
//   else j += 15;
//   const second = _toLocalString(j);
//   const minute = _toLocalString(k);
//   const hour = _toLocalString(l);
//   durations.push(`${hour}:${minute}:${second}`);
// }
// console.log(durations);

automateInstagramStory();
// cron.schedule("* * 1 * * *", automateInstagramStory);
// cron.schedule("0 0 * * * *", automateInstagramStory);

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
