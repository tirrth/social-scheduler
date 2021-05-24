const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const https = require("https");
const fs = require("fs");
const { generateRandomInteger } = require("./util");
const jimp = require("jimp");
// const path = require("path");
// const Xvfb = require("xvfb");

class InstagramPuppet {
  #BASE_PATH = process.cwd();
  #EXT_INSSIST_PATH = `${this.#BASE_PATH}/extensions/inssist`;
  #INSTAGRAM_BASE_URL = "https://instagram.com";
  // #EXT_BASE_URL =
  //   "chrome-extension://bcocdbombenodlegijagbhdjbifpiijp/inssist.html";
  // #BASE_URL = `${this.#EXT_BASE_URL}#${this.#INSTAGRAM_BASE_URL}`;
  #browser = null;
  #xvfb = null;
  #page = null;
  #frame = null;

  #chooseAppPreference = async (add_to_home) => {
    const app_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
      add_to_home ? "bIiDR" : "HoLwm"
    }`;
    await this.#page.waitForSelector(app_preference);
    await this.#page.click(app_preference);
  };

  #chooseLoginPreference = async (save_login_info, page = this.#page) => {
    const login_preference = `#react-root > section > main > div > div > div > ${
      save_login_info ? "section > " : ""
    }div > button`;
    await page.waitForSelector(login_preference);
    await page.click(login_preference);
  };

  #downloadStoryToLocal = async ({ url, dest, cb, is_video, err }) => {
    if (!is_video) {
      try {
        const image = await jimp.read(url);
        image.contain(1080, 1920);
        image.write(dest, cb);
      } catch (e) {
        err(e);
      }
    } else {
      const file = fs.createWriteStream(dest);
      const request = https.get(url, (response) => {
        if (response.statusCode !== 200) {
          return cb("Response status was " + response.statusCode);
        }
        response.pipe(file);
      });
      file.on("finish", () => file.close(cb));
      request.on("error", (error) => {
        fs.unlink(dest);
        err(error);
      });
      file.on("error", (error) => {
        fs.unlink(dest);
        err(error);
      });
    }
  };

  #removeStoryFromLocal = (file_path) => {
    try {
      fs.unlinkSync(file_path);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  #getInstagramFrame = async (page) => {
    await page.waitForSelector("iframe");
    return await page.frames()[1];
  };

  initialize = async () => {
    // this.#xvfb = new Xvfb({
    //   silent: true,
    //   xvfb_args: ["-screen", "0", "1280x720x24", "-ac"],
    // });
    // this.#xvfb.start((err) => {
    //   err && console.error("Xvfb Error =", err);
    //   err && this.exit();
    // });
    const browser = await puppeteer.launch({
      product: "chrome",
      headless: false,
      args: [
        `--disable-extensions-except=${this.#EXT_INSSIST_PATH}`,
        `--load-extension=${this.#EXT_INSSIST_PATH}`,
        "--start-fullscreen",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
    const page = await browser.newPage();
    await page._client.send("Emulation.clearDeviceMetricsOverride");
    this.#browser = browser;
    this.#page = page;
    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
      this.exit();
    });
  };

  emulateTo = async (device_name) => {
    await this.#page.emulate(puppeteer.devices[device_name]);
  };

  login = async (username, password, options = {}) => {
    await this.#page.goto("https://www.instagram.com/", {
      waitUntil: "networkidle2",
    });
    const { instagramSession } = global;
    if (Array.isArray(instagramSession) && instagramSession.length) {
      await this.#page.setCookie(...global.instagramSession);
      return;
    }
    // this.#frame = await this.#getInstagramFrame(this.#page);
    // const loginButton = await this.#page.waitForXPath(
    //   '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
    // );
    // await loginButton.click();
    await this.#page.waitForSelector("input[name=username]");
    await this.#page.type("input[name=username]", username);
    await this.#page.type("input[name=password]", password);
    await this.#page.click("button[type=submit]");
    await this.#chooseLoginPreference(!!options?.saveLoginInfo, this.#page);
    global.instagramSession = await this.#page.cookies();
    // console.log("global.instagramSession =", global.instagramSession);
  };

  goto = async (url) =>
    await this.#page.goto(url, { waitUntil: "networkidle2" });

  getRandomPostFromPage = async (page) => {
    if (page.startsWith("#")) {
      var page_link = `${
        this.#INSTAGRAM_BASE_URL
      }/explore/tags/${page.substring(1)}`;
    } else {
      page_link = `${this.#INSTAGRAM_BASE_URL}/${page}`;
    }
    page_link = `${page_link}?__a=1`;
    return fetch(page_link)
      .then((res) => res.json())
      .then((res) => {
        const image_filtered_edges =
          res.graphql.user.edge_owner_to_timeline_media.edges.filter(
            (obj) => !obj.node.is_video
          );
        const random_image_no = generateRandomInteger(
          0,
          image_filtered_edges.length - 1
        );
        return image_filtered_edges[random_image_no];
      });
  };

  uploadStory = async (url, file_path, options = {}) => {
    // await this.goto("https://insta-mobile.netlify.app");
    // await this.#chooseAppPreference(!!options?.addInstagramToHomeScreen);
    await this.goto("https://insta-mobile.netlify.app", {
      waitUntil: "networkidle2",
    });
    this.#frame = await this.#getInstagramFrame(this.#page);
    const camera_selector = "button[class='mTGkH']";
    await this.#frame.waitForSelector(camera_selector);
    const [fileChooser] = await Promise.all([
      this.#page.waitForFileChooser(),
      this.#frame.click(camera_selector),
    ]);
    fileChooser.isMultiple(false);
    await fileChooser.accept([file_path]);
    // const upload_btn = await this.#frame.waitForXPath(
    //   '//*[@id="react-root"]/section/footer/div/div/button'
    // );
    await this.#frame.waitForSelector("div[class='LEJ26'] > button");
    await this.#frame.evaluate(() => {
      document.querySelector("div[class='LEJ26'] > button").click();
    });
    await this.#frame.waitForSelector("p[class='gxNyb']", {
      visible: true,
    });
    await options.callback();
    // const upload_selector = "div[class='LEJ26']";
    // await this.#frame.waitForSelector(upload_selector);
    // await this.#frame.click(upload_selector);
    // await upload_btn.click();
    // await this.#frame.waitForXPath("/html/body/div[3]/div/div/div/p", {
    //   visible: true,
    // });
    // await options.callback();
    // this.#removeStoryFromLocal(file_path);
    // await this.#downloadStoryToLocal({
    //   url,
    //   dest: file_path,
    //   is_video: !!options.is_video,
    //   cb: async () => {
    //     const camera_selector = "button[class='mTGkH']";
    //     await this.#page.waitForSelector(camera_selector);
    //     const [fileChooser] = await Promise.all([
    //       this.#page.waitForFileChooser(),
    //       this.#page.click(camera_selector),
    //     ]);
    //     fileChooser.isMultiple(false);
    //     await fileChooser.accept([file_path]);
    //     const upload_btn = await this.#page.waitForXPath(
    //       '//*[@id="react-root"]/section/footer/div/div/button'
    //     );
    //     await upload_btn.click();
    //     await this.#page.waitForXPath("/html/body/div[3]/div/div/div/p", {
    //       visible: true,
    //     });
    //     await options.callback();
    //     this.#removeStoryFromLocal(file_path);
    //   },
    //   err: async (err) => (console.error(err), await this.exit()),
    // });
  };

  exit = async () => {
    await this.#browser.close();
    // this.#xvfb.stop((err) => err && console.log(err));
  };
}

module.exports = InstagramPuppet;
