const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const https = require("https");
const fs = require("fs");
const { generateRandomInteger } = require("./util");
const os = require("os");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

class InstagramPuppet {
  #BASE_PATH = process.cwd();
  #EXT_INSSIST_PATH = `${this.#BASE_PATH}/extensions/inssist`;
  #BASE_URL = "https://www.instagram.com";
  #INSTA_MOBILE_URL = "https://insta-mobile.netlify.app";
  #FALLBACK_IMAGE_URL = null;
  #BASE_DIR = null;
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
        return cb?.("Response status was " + response.statusCode);
      }
      response.pipe(file);
    });
    // close() is async, call cb after close completes
    file.on("finish", () => file.close(cb));
    // check for request error too
    request.on("error", (err) => {
      fs.unlink(dest);
      return cb?.(err?.message);
    });
    file.on("error", (err) => {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      return cb?.(err?.message);
    });
  };

  #removeStoryFromLocal = (file_path) => {
    try {
      fs.unlinkSync(file_path);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  #resetDirectory = () => {
    try {
      fs.rmdirSync(this.#BASE_DIR, { recursive: true });
      fs.mkdirSync(`${this.#BASE_DIR}/segments`, { recursive: true });
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
      // executablePath: "/app/.apt/usr/bin/google-chrome",
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
    this.#resetDirectory();
    this.#browser = browser;
    this.#page = page;
    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
      this.uploadStoryFromUrl(null, { callback: this.exit });
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
      return await this.#page.setCookie(...global.instagramSession);
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
        const edges = res?.graphql?.user?.edge_owner_to_timeline_media?.edges;
        if (!Array.isArray(edges)) return;
        const random_edge_no = generateRandomInteger(0, edges.length - 1);
        return edges[random_edge_no];
      });
  };

  #uploadStoryFromLocal = async (file_path, cb) => {
    await this.goto(this.#INSTA_MOBILE_URL);
    this.#frame = await this.#getInstagramFrame(this.#page);
    const camera_selector = "button[class='mTGkH']";
    await this.#frame.waitForSelector(camera_selector, { timeout: 45000 });
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
      timeout: 90000, // default: 30000
    });
    this.#removeStoryFromLocal(file_path);
    await cb?.({ success: true, res: "Story uploaded successfully" });
  };

  #downloadVideoChunks = ({ input, output_dir, callback }) => {
    ffmpeg.ffprobe(input, (err, metadata) => {
      if (err) callback(err);
      else {
        const _toLocalString = (number, minimumIntegerDigits = 2) => {
          return number.toLocaleString("en-US", {
            minimumIntegerDigits,
            useGrouping: false,
          });
        };
        const duration = Math.floor(metadata.format.duration);
        const time_intervals = [];
        // this is a hard-coded loop made particularly for instagram's 15-seconds interval story, do not ever recommend this (it sucks...)
        for (var i = 0, j = 0, k = 0, l = 0; i < duration; i += 15) {
          const second = _toLocalString(j);
          const minute = _toLocalString(k);
          const hour = _toLocalString(l);
          time_intervals.push(`${hour}:${minute}:${second}`);
          if (i && i % 60 === 0) (j = 0), k++;
          else if (i && i % 3600 === 0) (j = 0), l++;
          else j += 15;
        }
        let count = 0;
        time_intervals.map((startTime, idx) => {
          ffmpeg(input)
            .setStartTime(startTime)
            .setDuration(15)
            .output(`${output_dir}/video_${_toLocalString(idx, 2)}.mp4`)
            .on("end", (err) => {
              if (err) return callback(err);
              count += 1;
              if (count === time_intervals.length) {
                this.#removeStoryFromLocal(input);
                callback(err, "Conversion Done");
              }
            })
            .on("error", callback)
            .run();
        });
      }
    });
  };

  #uploadVideoFromLocal = (file_path, cb) => {
    const output_dir = `${this.#BASE_DIR}/segments`;
    const params = {
      input: file_path,
      output_dir,
      callback: async (err, res) => {
        if (err) cb?.({ success: false, error: err });
        else {
          const segments = fs.readdirSync(output_dir);
          for (const chunk of segments) {
            if (chunk.split(".").pop() === "mp4") {
              await this.#uploadStoryFromLocal(`${output_dir}/${chunk}`);
            }
          }
          await cb?.({ success: true, res });
        }
      },
    };
    this.#downloadVideoChunks(params);
  };

  uploadStoryFromUrl = (url, options = {}) => {
    if (!url) options.is_video = false;
    url = url || this.#FALLBACK_IMAGE_URL;
    const file_name = `file.${!options.is_video ? "jpeg" : "mp4"}`;
    const file_path = `${this.#BASE_DIR}/${file_name}`;
    this.#uploadStoryFromLocal(
      path.relative(process.cwd(), __dirname + "/public/images/") + "/ss.jpeg",
      options.callback
    );
    // this.#downloadStoryToLocal({
    //   url,
    //   dest: file_path,
    //   cb: (err) => {
    //     if (err) return options.callback({ success: false, error: err });
    //     if (options.is_video) {
    //       this.#uploadVideoFromLocal(file_path, options.callback);
    //     } else this.#uploadStoryFromLocal(file_path, options.callback);
    //   },
    // });
  };

  setFallbackImage = (img) => (this.#FALLBACK_IMAGE_URL = img);

  setBaseDir = (dir) => (this.#BASE_DIR = dir);

  exit = async () => (await this.#browser.close(), this.#resetDirectory());
}

module.exports = InstagramPuppet;
