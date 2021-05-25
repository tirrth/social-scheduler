const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const https = require("https");
const fs = require("fs");
const { generateRandomInteger } = require("./util");
const os = require("os");
class InstagramPuppet {
  #BASE_PATH = process.cwd();
  #EXT_INSSIST_PATH = `${this.#BASE_PATH}/extensions/inssist`;
  #BASE_URL = "https://instagram.com";
  #browser = null;
  #page = null;
  #frame = null;

  // #chooseAppPreference = async (add_to_home) => {
  //   const app_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
  //     add_to_home ? "bIiDR" : "HoLwm"
  //   }`;
  //   await this.#page.waitForSelector(app_preference);
  //   await this.#page.click(app_preference);
  // };

  #chooseLoginPreference = async (save_login_info, page = this.#page) => {
    const login_preference = `#react-root > section > main > div > div > div > ${
      save_login_info ? "section > " : ""
    }div > button`;
    await page.waitForSelector(login_preference);
    await page.click(login_preference);
  };

  #downloadStoryToLocal = async ({ url, dest, cb }) => {
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
      fs.unlink(dest);
      return cb(err?.message);
    });
    file.on("error", (err) => {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      return cb(err?.message);
    });
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
    const frame = await page.frames()[1];
    return frame;
  };

  initialize = async () => {
    const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    let executablePath;
    if (/^win/i.test(osPlatform)) {
      executablePath = "";
    } else if (/^linux/i.test(osPlatform)) {
      executablePath = "/usr/bin/google-chrome";
    } else if (/^darwin/i.test(osPlatform)) {
      executablePath = `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome`;
    }
    const browser = await puppeteer.launch({
      product: "chrome",
      executablePath,
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        `--disable-extensions-except=${this.#EXT_INSSIST_PATH}`,
        `--load-extension=${this.#EXT_INSSIST_PATH}`,
        "--start-fullscreen",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
    // const browser = await puppeteer.connect({
    //   browserWSEndpoint:
    //     "ws://127.0.0.1:9222/devtools/browser/28cb9cf1-b2fd-4af9-ae3e-5d5b774750ad",
    // });
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
    await this.#page.waitForSelector("input[name=username]");
    await this.#page.type("input[name=username]", username);
    await this.#page.type("input[name=password]", password);
    await this.#page.click("button[type=submit]");
    await this.#chooseLoginPreference(!!options?.saveLoginInfo, this.#page);
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
        // const edges =
        //   res?.graphql?.user?.edge_owner_to_timeline_media?.edges?.filter(
        //     (obj) => !obj.node.is_video
        //   );
        const edges = res?.graphql?.user?.edge_owner_to_timeline_media?.edges;
        const random_edge_no = generateRandomInteger(0, edges.length - 1);
        return edges[random_edge_no];
      });
  };

  uploadStory = async (url, file_path, callback) => {
    await this.#downloadStoryToLocal({
      url,
      dest: file_path,
      cb: async (err) => {
        if (err) {
          return callback({ success: false, error: err });
        }
        await this.#page.goto("https://insta-mobile.netlify.app", {
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
        await this.#frame.waitForSelector("div[class='LEJ26'] > button");
        await this.#frame.evaluate(() => {
          document.querySelector("div[class='LEJ26'] > button").click();
        });
        await this.#frame.waitForSelector("p[class='gxNyb']", {
          visible: true,
        });
        await callback({ success: true });
        this.#removeStoryFromLocal(file_path);
      },
    });
  };

  exit = async () => await this.#browser.close();
}

module.exports = InstagramPuppet;
