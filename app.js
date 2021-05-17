var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

const puppeteer = require("puppeteer");

const _postOnInstagram = async () => {
  const browser = await puppeteer.launch({
    // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: false,
  });
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices["iPhone 8"]);

  // ------------------------- Login to instagram -------------------------
  await page.goto("https://www.instagram.com", { waitUntil: "networkidle2" });
  const login_nav_btn = await page.waitForXPath(
    '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
  );
  await login_nav_btn.click();
  await page.type("input[name='username']", "randomlyyyyyyy.it");
  await page.type("input[name='password']", "@$dfghjk!Instagram123@");
  await page.click("button[type=submit]");
  // ------------------------- (EXIT) Login to instagram -------------------------

  // ------------------------- Preferences -------------------------
  const not_preferred_to_save_login_info = await page.waitForXPath(
    '//*[@id="react-root"]/section/main/div/div/div/button'
  );
  await not_preferred_to_save_login_info.click();
  const not_preferred_to_add_instal_on_home_screen = await page.waitForXPath(
    "/html/body/div[4]/div/div/div/div[3]/button[2]"
  );
  await not_preferred_to_add_instal_on_home_screen.click();
  // ------------------------- (EXIT) Preferences -------------------------

  // const scriptToInject = `
  //   const URLtoFile = (url) =>
  //     fetch(url)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         let file_obj = new File([blob], 'instagram.jpg', {
  //           type: blob.type,
  //         });
  //         return Promise.resolve(file_obj);
  //       })
  //       .catch((err) => {
  //         return Promise.reject(new Error(err.message));
  //       });
  //   const inputFileElements = document.getElementsByTagName("input");
  //   for (let i = 0; i < inputFileElements.length; i++) {
  //     const isFileInput = inputFileElements[i].getAttribute("type") === "file";
  //     isFileInput && inputFileElements[i].addEventListener(
  //       "click",
  //       (e) => {
  //         console.log(e);
  //         // e.preventDefault();
  //         // const list = new DataTransfer();
  //         // URLtoFile("https://instagram.famd4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/185248674_2887173024945045_4364915315739140361_n.jpg?tp=1&_nc_ht=instagram.famd4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=Zj4jq8FjMvsAX9VSIeL&edm=AIQHJ4wBAAAA&ccb=7-4&oh=dab2290d526ff4320ef2d28b49a764d2&oe=60C74C30&_nc_sid=7b02f1")
  //         //   .then((fileData) => {
  //         //     list.items.add(fileData);
  //         //     const customisedFileList = list.files;
  //         //     customisedFileList.length && inputFileElements[i].setAttribute("files", customisedFileList);
  //         //     console.log("inputFileElements[i] =",inputFileElements[i]);
  //         //     inputFileElements[i].dispatchEvent(new Event("change", { bubbles: true }));

  //         //     // var script = document.createElement("script");
  //         //     // script.setAttribute('as', 'script');
  //         //     // script.setAttribute('crossorigin', 'anonymous');
  //         //     // script.setAttribute('charset', 'utf-8');
  //         //     // script.setAttribute('async', '');
  //         //     // var link = document.createElement("link");
  //         //     // script.type = "text/javascript";
  //         //     // link.type = "text/css";
  //         //     // link.setAttribute('crossorigin', 'anonymous');
  //         //     // link.setAttribute('rel', 'stylesheet');
  //         //     // script.src = "/static/bundles/metro/StoryCreationPage.js/9d3d1d7a634f.js";
  //         //     // link.href = "/static/bundles/metro/StoryCreationPage.css/28ce785985f6.css";
  //         //     // document.getElementsByTagName("head")[0].append(script);
  //         //     // document.getElementsByTagName("head")[0].append(link);

  //         //     // document.getElementsByClassName('_9eogI E3X2T')[0].remove();
  //         //     // document.getElementsByTagName('form')[0].remove();
  //         //     // document.getElementById('react-root').innerHTML = '<section class="_9eogI _650Zr "><canvas class="Ld4Da" height="2208" width="1242" style="width: 414px; height: 736px;"></canvas><canvas class="H887p " width="1242" height="2208" style="width: 414px; height: 736px;"></canvas><canvas class="x3piU " width="1242" height="2208" style="width: 414px; height: 736px;"></canvas><header class="iuGAs"><button class="fzzBT storiesSpriteX__outline__44"><span class="Szr5J">Close</span></button><div class="o4NXM"><button class="CrSny storiesSpriteDownload__outline__44"></button><button class="afBMw storiesSpriteSticker__outline__44"></button><button class="K4li- storiesSpriteDrawing_tools__filled__44"></button><button class="HsQIV storiesSpriteText__filled__44"></button></div></header><footer class="_Z29A"><div class="                     Igw0E     IwRSH   pmxbr   eGOV_         _4EzTm        FBi-h                                                                          BI4qX                      O1flK  fm1AK    "><div class="LEJ26"><button class="sqdOP yWX7d    y3zKF     " type="button"><div class="                     Igw0E     IwRSH      eGOV_     ybXk5    _4EzTm                                                                                                              "><span aria-label="Add to your story" class="storiesSpriteNew_story__outline__24__grey_0 u-__7"></span><span class="cQjQD">Add to your story</span></div></button></div></div></footer></section>';
  //         //     // document.getElementsByClassName('Ld4Da')[0].style.background = 'url(https://instagram.famd4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/185248674_2887173024945045_4364915315739140361_n.jpg?tp=1&_nc_ht=instagram.famd4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=Zj4jq8FjMvsAX9VSIeL&edm=AIQHJ4wBAAAA&ccb=7-4&oh=dab2290d526ff4320ef2d28b49a764d2&oe=60C74C30&_nc_sid=7b02f1)';
  //         //     console.log("File/s Uploaded successfully!!");
  //         //   })
  //         //   .catch(console.log);
  //       }
  //     );
  //   }
  // `;
  // await page.evaluate((scriptText) => {
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.textContent = scriptText;
  //   document.body.parentElement.appendChild(script);
  // }, scriptToInject);

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("button[class='mTGkH']"),
  ]);

  const filePath = path.relative(
    process.cwd(),
    __dirname + "/public/images/ss.jpg"
  );
  await fileChooser.accept([filePath]);
  const upload_btn = await page.waitForXPath(
    '//*[@id="react-root"]/section/footer/div/div/button'
  );
  await upload_btn.click();

  // const click_on_add_story = await page.waitForXPath(
  //   '//*[@id="react-root"]/section/nav[1]/div/div/header/div/div[1]/button'
  // );
  // await click_on_add_story.click();
  // const stories_are_not_better_in_the_app = await page.waitForXPath(
  //   "/html/body/div[4]/div/div[2]/div/div[5]/button"
  // );
  // await page.evaluate((btn) => btn.click(), stories_are_not_better_in_the_app);

  // const filePath = path.relative(
  //   process.cwd(),
  //   __dirname + "/public/images/pp.jpg"
  // );
  // const story_input = await page.$("#react-root > form > input[type=file]");
  // await story_input.uploadFile(filePath);
  // // await page.evaluate((btn) => btn.click(), stories_are_not_better_in_the_app);
  // await story_input.evaluate((upload) =>
  //   upload.dispatchEvent(new Event("change", { bubbles: true }))
  // );
};
_postOnInstagram();

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
