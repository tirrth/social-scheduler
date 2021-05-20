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

const instagram_pages = {
  memes,
  motivational,
  cute_animals,
  knowledge,
  nature,
};

const _getInstagramPage = () => {
  return instagram_pages.motivational;
};

const _getRandomPage = () => {
  const instagram_page = _getInstagramPage();
  const random_page_no = generateRandomInteger(0, instagram_page.length - 1);
  const random_page = `${instagram_page[random_page_no]}`;
  // const random_page = "#video";
  // if (random_page.startsWith("#")) {
  //   return `https://instagram.com/explore/tags/${random_page.substring(1)}`;
  // }
  // return `https://instagram.com/${random_page}`;
  return random_page;
};

const automateInstagramStory = async () => {
  const navigateToPage = _getRandomPage();
  const ig = new InstagramPuppet();
  await ig.initialize();
  // await ig.emulateTo("iPhone 8");
  const { CLIENT_ID, SECRET_KEY } = process.env;
  await ig.login(CLIENT_ID, SECRET_KEY);
  // await ig.goto(
  //   "chrome-extension://bcocdbombenodlegijagbhdjbifpiijp/inssist.html"
  // );
  // return;
  const destination = "/public/images/file.mp4";
  const filePath = path.relative(process.cwd(), __dirname + destination);
  (async () => {
    await ig.uploadStory("display_url", filePath, {
      callback: async () => await ig.exit(),
    });
  })();
  // ig.getRandomPostFromPage(navigateToPage)
  //   .then((resp) => {
  //     const { display_url } = resp?.node;
  //     if (display_url) {
  //       const destination = "/public/images/file.jpeg";
  //       const filePath = path.relative(process.cwd(), __dirname + destination);
  //       (async () => {
  //         await ig.uploadStory(display_url, filePath, {
  //           callback: async () => await ig.exit(),
  //         });
  //       })();
  //     }
  //   })
  //   .catch((err) => console.log(err));
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
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "shbid",
//     value: "3725",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1621923871.297525,
//     size: 9,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "shbts",
//     value: "1621319071.2428622",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1621923871.297677,
//     size: 23,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "sessionid",
//     value: "34723755971%3ATsfollXdjiLP7A%3A13",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1652855070.406857,
//     size: 42,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "mid",
//     value: "YKNdmgAAAAE8InmuexfI4jfvaA0y",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1684391066.331293,
//     size: 31,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "csrftoken",
//     value: "Z0WhczYGbrsVe60ZN52khDtOpbeYQoLg",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1652768672.025655,
//     size: 41,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "ig_nrcb",
//     value: "1",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1652855065.643324,
//     size: 8,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "ds_user_id",
//     value: "34723755971",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1629095072.025793,
//     size: 21,
//     httpOnly: false,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
//   {
//     name: "ig_did",
//     value: "745707D4-7FF9-4D9D-8435-94F86337FADE",
//     domain: ".instagram.com",
//     path: "/",
//     expires: 1684391065.643135,
//     size: 42,
//     httpOnly: true,
//     secure: true,
//     session: false,
//     sameParty: false,
//     sourceScheme: "Secure",
//     sourcePort: 443,
//   },
// ];
automateInstagramStory();

// cron.schedule("0 0 * * * *", _postStoryOnInstagram);

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
