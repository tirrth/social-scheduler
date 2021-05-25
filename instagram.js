const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const https = require("https");
const fs = require("fs");
const { generateRandomInteger } = require("./util");
const os = require("os");
const ffmpeg = require("ffmpeg");

class InstagramPuppet {
  #BASE_PATH = process.cwd();
  #EXT_INSSIST_PATH = `${this.#BASE_PATH}/extensions/inssist`;
  #BASE_URL = "https://www.instagram.com";
  #INSTA_MOBILE_URL = "https://insta-mobile.netlify.app";
  #browser = null;
  #page = null;
  #frame = null;

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

  goto = async (url) =>
    await this.#page.goto(url, { waitUntil: "networkidle2" });

  login = async (username, password, options = {}) => {
    await this.goto(this.#BASE_URL);
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

  getRandomPostFromPage = async (page) => {
    if (!page) throw new Error("No page found");
    if (page.startsWith("#")) {
      var page_link = `${this.#BASE_URL}/explore/tags/${page.substring(1)}`;
    } else page_link = `${this.#BASE_URL}/${page}`;
    page_link = `${page_link}?__a=1`;
    return fetch(page_link)
      .then((res) => res.json())
      .then((res) => {
        const edges =
          res?.graphql?.user?.edge_owner_to_timeline_media?.edges.filter(
            (e) => e.node.is_video
          );
        if (!Array.isArray(edges)) return;
        const random_edge_no = generateRandomInteger(0, edges.length - 1);
        return edges[random_edge_no];
      });
  };

  #uploadStoryFromLocal = async (file_path, cb) => {
    // this.#page = await this.#browser.newPage();
    await this.goto(this.#INSTA_MOBILE_URL);
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
    await cb?.({ success: true, res: "Story uploaded successfully" });
    this.#removeStoryFromLocal(file_path);
  };

  #getFileDirectory = (file_path) => {
    file_path = file_path.split("/");
    file_path.pop();
    return file_path.join("/");
  };

  #downloadVideoChunks = ({ input, duration, output, callback }) => {
    const process = new ffmpeg(input);
    process
      .then((video) => {
        video.addCommand("-c", "copy");
        video.addCommand("-map", 0);
        // video.addCommand("-force_key_frames", "expr:gte(t,n_forced*9)");
        video.addCommand("-segment_time", `00:${duration}`);
        video.addCommand("-f", "segment");
        video.addCommand("-reset_timestamps", "1");
        video.save(output, callback);
      }, callback)
      .catch(callback);
  };

  #uploadVideoFromLocal = async (file_path, cb) => {
    const file_dir = this.#getFileDirectory(file_path);
    const params = {
      input: file_path,
      duration: 12,
      output: `${file_dir}/segments/video_%03d.mp4`,
      callback: (err, res) => {
        if (err) cb?.({ success: false, error: err });
        else {
          const segments = fs.readdirSync(`${file_dir}/segments`);
          (async () => {
            for (const chunk of segments) {
              await this.#uploadStoryFromLocal(`${file_dir}/segments/${chunk}`);
            }
          })();
          // Promise.all(
          //   segments.map((chunk_name) => {
          //     return this.#uploadStoryFromLocal(
          //       `${file_dir}/segments/${chunk_name}`,
          //       () => null
          //     );
          //   })
          // ).then((values) => {
          //   console.log(values);
          // });
          // console.log("Video file: ", res);
          // cb({ success: true, res });
        }
      },
    };
    this.#downloadVideoChunks(params);
  };

  uploadStoryFromUrl = (url, file_path, options = {}) => {
    this.#downloadStoryToLocal({
      url,
      dest: file_path,
      cb: async (err) => {
        if (err) {
          return options.callback?.({ success: false, error: err });
        }
        if (options.is_video) {
          this.#uploadVideoFromLocal(file_path, options.callback);
        } else this.#uploadStoryFromLocal(file_path, options.callback);
      },
    });
  };

  exit = async () => await this.#browser.close();
}

module.exports = InstagramPuppet;
