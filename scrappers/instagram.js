const puppeteer = require("puppeteer-core");
const https = require("https");
const fs = require("fs");
const os = require("os");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
const { generateRandomInteger, minimumIntegerDigits } = require("../util");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

class InstagramPuppet {
  #BASE_PATH = process.cwd();
  #EXT_INSSIST_PATH = `${this.#BASE_PATH}/extensions/inssist`;
  #BASE_URL = "https://www.instagram.com";
  #INSTA_MOBILE_URL = "https://insta-mobile.netlify.app";
  #FALLBACK_IMAGES_URL = [];
  #BASE_DIR = null;
  #browser = null;
  #page = null;
  #frame = null;

  #chooseLoginPreference = async (save_login_info, page = this.#page) => {
    const login_preference = `#react-root > section > main > div > div > div > ${
      save_login_info ? "section > " : ""
    }div > button`;
    try {
      await page.waitForSelector(login_preference);
      await page.click(login_preference);
    } catch (err) {
      console.log("Choosing Login Preference Error: ", err);
      return false;
    }
  };

  #downloadStoryToLocal = async ({ url, dest, cb }) => {
    if (!url) return cb?.("No Story Found!!");
    const alt_cb = (err) => {
      if (err) console.log("File Downloading Callback Error: ", err);
      else console.log("File Downloading Callback Response: Successful....");
    };
    cb = cb || alt_cb;
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
      fs.unlink(dest, () => null);
      return cb(err?.message);
    });
    file.on("error", (err) => {
      // Handle errors
      fs.unlink(dest, () => null); // Delete the file async. (But we don't check the result)
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
    if (/^win/i.test(osPlatform)) executablePath = "";
    else if (/^linux/i.test(osPlatform)) {
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
    this.#resetDirectory();
    this.#browser = browser;
    this.#page = page;
    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
      this.uploadStoryFromUrl(null, { callback: this.exit });
    });
  };

  emulateTo = async (device_name) =>
    await this.#page.emulate(puppeteer.devices[device_name]);

  goto = async (url) => {
    await this.#page.goto(url, { waitUntil: "networkidle2" });
  };

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
    if (!page) throw new Error("Page not found");
    if (page.startsWith("#")) {
      var page_link = `${this.#BASE_URL}/explore/tags/${page.substring(1)}`;
    } else page_link = `${this.#BASE_URL}/${page}`;
    page_link = `${page_link}?__a=1`;
    console.log("Page Link: " + page_link);
    const response = await this.#page.goto(page_link);
    const body = await response.json();
    const edges = body?.graphql?.user?.edge_owner_to_timeline_media?.edges;
    if (!Array.isArray(edges)) return;
    const random_edge_no = generateRandomInteger(0, edges.length - 1);
    return edges[random_edge_no];
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
    console.log("Story uploaded successfully...");
    await cb?.({ success: true, res: "Story uploaded successfully" });
  };

  #downloadVideoChunks = ({ input, output_dir, callback }) => {
    ffmpeg.ffprobe(input, (err, metadata) => {
      if (err) callback(err);
      else {
        const duration = Math.floor(metadata.format.duration);
        console.log("Video duration =", duration);
        const time_intervals = [];
        // this is a hard-coded loop made particularly for instagram's 15-seconds interval story, do not ever recommend this (it sucks...)
        for (var i = 0, j = 0, k = 0, l = 0; i < duration; i += 15) {
          const second = minimumIntegerDigits(j);
          const minute = minimumIntegerDigits(k);
          const hour = minimumIntegerDigits(l);
          time_intervals.push(`${hour}:${minute}:${second}`);
          if (i && i % 60 === 0) (j = 0), k++;
          else if (i && i % 3600 === 0) (j = 0), l++;
          else j += 15;
        }
        console.log("Time intervals: ", time_intervals);
        let count = 0;
        time_intervals.map((startTime, idx) => {
          ffmpeg(input)
            .setStartTime(startTime)
            .setDuration(15)
            .output(`${output_dir}/video_${minimumIntegerDigits(idx, 2)}.mp4`)
            .on("end", (err) => {
              if (err) return console.log("Ffmpeg Error: ", err), callback(err);
              count += 1;
              console.log("Conversion count => " + count);
              if (count === time_intervals.length) {
                this.#removeStoryFromLocal(input);
                console.log("--- Conversion Done ---");
                return callback(err, "Conversion Done");
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
    if (!url) {
      options.is_video = false;
      const fallback_images = this.#FALLBACK_IMAGES_URL;
      const random_no = generateRandomInteger(0, fallback_images.length);
      url = fallback_images?.[random_no] || fallback_images?.[0];
      console.log("Fallback Story URL: " + url);
    } else console.log("Story URL: " + url);
    const file_name = `file.${!options.is_video ? "jpeg" : "mp4"}`;
    const file_path = `${this.#BASE_DIR}/${file_name}`;
    this.#downloadStoryToLocal({
      url,
      dest: file_path,
      cb: (err) => {
        if (err) return options.callback({ success: false, error: err });
        console.log("File downloaded successfully...");
        if (options.is_video) {
          this.#uploadVideoFromLocal(file_path, options.callback);
        } else this.#uploadStoryFromLocal(file_path, options.callback);
      },
    });
  };

  setFallbackImages = (imgs) => this.#FALLBACK_IMAGES_URL.push(...imgs);

  setBaseDir = (dir) => (this.#BASE_DIR = dir);

  exit = async () => (await this.#browser.close(), this.#resetDirectory());
}

module.exports = InstagramPuppet;
