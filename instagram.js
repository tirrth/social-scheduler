const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const https = require("https");
const fs = require("fs");
const { generateRandomInteger } = require("./util");
const jimp = require("jimp");
const path = require("path");

class InstagramPuppet {
  #EXT_INSSIST_PATH = "extensions/inssist";
  #INSTAGRAM_BASE_URL = "https://instagram.com";
  #EXT_BASE_URL =
    "chrome-extension://bcocdbombenodlegijagbhdjbifpiijp/inssist.html";
  #BASE_URL = `${this.#EXT_BASE_URL}#${this.#INSTAGRAM_BASE_URL}`;
  #browser = null;
  #page = null;
  #frame = null;

  #chooseAppPreference = async (add_to_home) => {
    const app_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
      add_to_home ? "bIiDR" : "HoLwm"
    }`;
    await this.#page.waitForSelector(app_preference);
    await this.#page.click(app_preference);
  };

  #chooseLoginPreference = async (save_login_info) => {
    const login_preference = `#react-root > section > main > div > div > ${
      save_login_info ? "section > " : ""
    }div > button`;
    await this.#page.waitForSelector(login_preference);
    await this.#page.click(login_preference);
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

  initialize = async () => {
    const browser = await puppeteer.launch({
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
      // this.#browser.close();
    });
  };

  emulateTo = async (device_name) => {
    await this.#page.emulate(puppeteer.devices[device_name]);
  };

  login = async (username, password, options = {}) => {
    await this.#page.goto("https://insta-mobile.netlify.app", {
      waitUntil: "networkidle2",
    });

    // const getStartedButton = await this.#page.waitForXPath(
    //   '//*[@id="app"]/div[1]/div[2]/div[2]/div[2]/div/button'
    // );
    // await getStartedButton.click();
    // return;
    if (Array.isArray(global.instagramSession)) {
      await this.#page.setCookie(...global.instagramSession);
      return;
    }

    await this.#page.waitForSelector("iframe");
    const instagram_frame = await this.#page.frames()[1];
    this.#frame = instagram_frame;
    const loginButton = await this.#frame.waitForXPath(
      '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
    );
    await loginButton.click();

    // console.log(this.#page.mainFrame().childFrames()[0]);
    // const elementHandle = this.#page.mainFrame().childFrames()[0];
    // return;
    // const elementHandle = await this.#page.$("iframe");
    // const elementHandle = await this.#page.waitForXPath(
    //   '//*[@id="app"]/div[1]/div[2]/div[2]/div[1]/div[2]/div/div/div[3]/iframe'
    // );
    // const frame = await this.#page.frames()[1];

    // console.log(frame[1]);
    // return;
    // await this.#page.waitForSelector("iframe");
    // const frameHandle = await page.$("iframe");
    // const frame = await frameHandle.contentFrame();
    await this.#frame.waitForSelector("input[name=username]");
    await this.#frame.type("input[name=username]", username);
    await this.#frame.type("input[name=password]", password);
    await this.#frame.click("button[type=submit]");
    await this.#chooseLoginPreference(!!options?.saveLoginInfo);
    global.instagramSession = await this.#page.cookies();
  };

  goto = async (url) =>
    await this.#page.goto(url, { waitUntil: "networkidle2" });

  getRandomPostFromPage = async (page) => {
    if (page.startsWith("#")) {
      var page_link = `${this.#BASE_URL}/explore/tags/${page.substring(1)}`;
    } else {
      page_link = `${this.#BASE_URL}/${page}`;
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
    await this.goto(this.#BASE_URL);
    await this.#chooseAppPreference(!!options?.addInstagramToHomeScreen);
    const camera_selector = "button[class='mTGkH']";
    await this.#page.waitForSelector(camera_selector);
    const [fileChooser] = await Promise.all([
      this.#page.waitForFileChooser(),
      this.#page.click(camera_selector),
    ]);
    fileChooser.isMultiple(false);
    await fileChooser.accept([file_path]);
    const upload_btn = await this.#page.waitForXPath(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );
    await upload_btn.click();
    await this.#page.waitForXPath("/html/body/div[3]/div/div/div/p", {
      visible: true,
    });
    await options.callback();
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
  };
}

module.exports = InstagramPuppet;
