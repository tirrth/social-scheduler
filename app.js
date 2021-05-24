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
const puppeteer = require("puppeteer");
const Xvfb = require("xvfb");

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
  await ig.goto("https://insta-mobile.netlify.app");
  // return;
  // const destination = "/public/files/instagram.mp4";
  // const filePath = path.relative(process.cwd(), __dirname + destination);
  // (async () => {
  //   await ig.uploadStory("display_url", filePath, {
  //     callback: async () => await ig.exit(),
  //   });
  // })();
  ig.getRandomPostFromPage(navigateToPage)
    .then((resp) => {
      const { display_url } = resp?.node;
      if (display_url) {
        const destination = "/public/files/file.jpeg";
        const filePath = path.relative(process.cwd(), __dirname + destination);
        (async () => {
          await ig.uploadStory(display_url, filePath, {
            callback: async () => await ig.exit(),
          });
        })();
      }
    })
    .catch((err) => console.log(err));
};

global.instagramSession = [
  {
    name: "rur",
    value: "ASH",
    domain: ".instagram.com",
    path: "/",
    expires: -1,
    size: 6,
    httpOnly: true,
    secure: true,
    session: true,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "shbid",
    value: "19630",
    domain: ".instagram.com",
    path: "/",
    expires: 1622427204.092547,
    size: 10,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "shbts",
    value: "1621822404.2825937",
    domain: ".instagram.com",
    path: "/",
    expires: 1622427204.092612,
    size: 23,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "sessionid",
    value: "35637751930%3AmhFjcYpqizu9lQ%3A1",
    domain: ".instagram.com",
    path: "/",
    expires: 1653358403.11667,
    size: 41,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "ds_user_id",
    value: "35637751930",
    domain: ".instagram.com",
    path: "/",
    expires: 1629598405.082684,
    size: 21,
    httpOnly: false,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "ig_did",
    value: "6D82A395-8041-48FC-B5D9-41EAFA8E4E29",
    domain: ".instagram.com",
    path: "/",
    expires: 1684894398.877367,
    size: 42,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "mid",
    value: "YKsLvwAEAAFIoiuBFou8iLPthP75",
    domain: ".instagram.com",
    path: "/",
    expires: 1684894398.877292,
    size: 31,
    httpOnly: false,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "csrftoken",
    value: "tqj5bNuSHoszdBwT2a6mUBjFtYFvyJgj",
    domain: ".instagram.com",
    path: "/",
    expires: 1653272005.082586,
    size: 41,
    httpOnly: false,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
  {
    name: "ig_nrcb",
    value: "1",
    domain: ".instagram.com",
    path: "/",
    expires: 1653358398.877414,
    size: 8,
    httpOnly: false,
    secure: true,
    session: false,
    sameSite: "None",
    sameParty: false,
    sourceScheme: "Secure",
    sourcePort: 443,
  },
];
automateInstagramStory();

// (async () => {
//   var xvfb = new Xvfb({
//     silent: true,
//     xvfb_args: ["-screen", "0", "1280x720x24", "-ac"],
//   });
//   xvfb.start((err) => {
//     if (err) console.error(err);
//   });
//   console.log("_display =", xvfb._display);
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null, //otherwise it defaults to 800x600
//     args: ["--no-sandbox", "--start-fullscreen", "--display=" + xvfb._display],
//   });
//   const page = await browser.newPage();
// await page.goto(`https://wikipedia.org`, { waitUntil: "networkidle2" });
// await page.screenshot({ path: "result.png" });
//   await browser.close();
//   xvfb.stop();
// })();

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
