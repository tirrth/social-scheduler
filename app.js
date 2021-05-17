var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
var indexRouter = require("./routes/index");
var app = express();
const cron = require("node-cron");
const https = require("https");
const puppeteer = require("puppeteer");
const ig = require("./instagram");

const _deleteLocalFile = (dest) => {
  try {
    fs.unlinkSync(dest);
  } catch (err) {
    console.error(err);
  }
};

const _downloadLocalFile = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  const request = https.get(url, (response) => {
    // check if response is success
    if (response.statusCode !== 200) {
      return cb("Response status was " + response.statusCode);
    }
    response.pipe(file);
  });
  // close() is async, call cb after close completes
  file.on("finish", () => file.close(cb));
  // check for request error too
  request.on("error", (err) => {
    _deleteLocalFile(dest);
    return cb(err.message);
  });
  file.on("error", (err) => {
    // Handle errors
    _deleteLocalFile(dest); // Delete the file async. (But we don't check the result)
    return cb(err.message);
  });
};

const memes_pages = [
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

const motivational_quotes_pages = [
  "6amsuccess",
  "motivationmafia",
  "foundr",
  "addicted2success",
  "quoteoftheday",
  "quotes",
  "positivevibesquotes",
  "gangsters.quotes",
  "poetry",
  "visionofsuccess",
];

const cute_animals_pages = [
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

const knowledge_pages = [
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

const nature_pages = [
  "#nature",
  "#naturephotography",
  "nature.geography",
  "discovery",
  "#naturegeography",
  "nature._.videos",
];

// const _postStoryOnInstagram = async () => {
//   const browser = await puppeteer.launch({
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.emulate(puppeteer.devices["iPhone 8"]);

//   // ------------------------- Login to instagram -------------------------
//   await page.goto("https://www.instagram.com", {
//     waitUntil: "networkidle2",
//   });
//   const login_nav_btn = await page.waitForXPath(
//     '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
//   );
//   await login_nav_btn.click();
//   await page.type("input[name=username]", "techno.savvyh");
//   await page.type("input[name=password]", "@$dfghjk!Instagram123@");
//   await page.click("button[type=submit]");
//   // ------------------------- (EXIT) Login to instagram -------------------------

//   // ------------------------- Preferences -------------------------
//   const not_preferred_to_save_login_info = await page.waitForXPath(
//     '//*[@id="react-root"]/section/main/div/div/div/button'
//   );
//   await not_preferred_to_save_login_info.click();
//   const not_preferred_to_add_instal_on_home_screen = await page.waitForXPath(
//     "/html/body/div[4]/div/div/div/div[3]/button[2]"
//   );
//   await not_preferred_to_add_instal_on_home_screen.click();
//   // ------------------------- (EXIT) Preferences -------------------------

//   await page.click(
//     "#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div:nth-child(2) > a"
//   );
//   await page.type(
//     "#react-root > section > nav.gW4DF > div > header > div > h1 > div > div > div > div > label > input",
//     nature_pages[0]
//   );
//   return;
//   const destination = "/public/images/file.jpg";
//   const filePath = path.relative(process.cwd(), __dirname + destination);
//   _downloadLocalFile(
//     "https://images.unsplash.com/photo-1620126956052-e75d9462e66b?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max",
//     filePath,
//     async (err) => {
//       if (err) {
//         console.log("Error: " + err);
//         return;
//       }

//       // ------------------------- File Uploader -------------------------
//       const [fileChooser] = await Promise.all([
//         page.waitForFileChooser(),
//         page.click("button[class='mTGkH']"),
//       ]);

//       fileChooser.isMultiple(false);
//       await fileChooser.accept([filePath]);
//       const upload_btn = await page.waitForXPath(
//         '//*[@id="react-root"]/section/footer/div/div/button'
//       );
//       await upload_btn.click();
//       await page.waitForXPath("/html/body/div[3]/div/div/div/p", {
//         visible: true,
//       });
//       // ------------------------- (EXIT) File Uploader -------------------------

//       await browser.close();
//       _deleteLocalFile(filePath);
//     }
//   );
// };
// _postStoryOnInstagram();

(async () => {
  await ig.initialize();
  await ig.emulateTo("iPhone 8");
  await ig.login("techno.savvyh", "@$dfghjk!Instagram123@", {
    saveLoginInfo: false,
    addInstagramToHomeScreen: false,
    allowNotifications: false,
  });
  await ig.searchFor(nature_pages[0]);
  await ig.selectSearchResult({ search_result: 1 });
  const randomPostInfo = await ig.getRandomPostInfo();
  console.log(randomPostInfo);
})();

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
