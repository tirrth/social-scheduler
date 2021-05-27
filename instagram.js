const puppeteer = require("puppeteer");
const https = require("https");
const fs = require("fs");
const os = require("os");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
const { generateRandomInteger, minimumIntegerDigits } = require("./util");
const axios = require("axios");
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
    console.log("this!!");
    await page.waitForSelector(login_preference);
    console.log("is!!");
    await page.click(login_preference);
    console.log("working1111111!!");
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
    if (/^win/i.test(osPlatform)) executablePath = "";
    else if (/^linux/i.test(osPlatform)) {
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
    console.log("this!!");
    await this.#page.waitForSelector("input[name=username]");
    console.log("is!!");
    await this.#page.type("input[name=username]", username);
    await this.#page.type("input[name=password]", password);
    console.log("working2222!!");
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
    console.log("Page Link =", page_link);
    return axios.get(page_link).then((res) => {
      const { data } = res;
      console.log("data =", data);
      const edges = data?.graphql?.user?.edge_owner_to_timeline_media?.edges;
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
        const duration = Math.floor(metadata.format.duration);
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
        let count = 0;
        time_intervals.map((startTime, idx) => {
          ffmpeg(input)
            .setStartTime(startTime)
            .setDuration(15)
            .output(`${output_dir}/video_${minimumIntegerDigits(idx, 2)}.mp4`)
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
    this.#downloadStoryToLocal({
      url,
      dest: file_path,
      cb: (err) => {
        if (err) return options.callback({ success: false, error: err });
        if (options.is_video) {
          this.#uploadVideoFromLocal(file_path, options.callback);
        } else this.#uploadStoryFromLocal(file_path, options.callback);
      },
    });
  };

  setFallbackImage = (img) => (this.#FALLBACK_IMAGE_URL = img);

  setBaseDir = (dir) => (this.#BASE_DIR = dir);

  exit = async () => (await this.#browser.close(), this.#resetDirectory());
}

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

const _getInstagramPageCategory = () => {
  const categories = [memes, motivational, cute_animals, knowledge, nature];
  const random_category_no = generateRandomInteger(0, categories.length - 1);
  return categories[random_category_no];
};

const _getRandomPage = () => {
  const instagram_page = _getInstagramPageCategory();
  const random_page_no = generateRandomInteger(0, instagram_page.length - 1);
  const random_page = `${instagram_page[random_page_no]}`;
  return random_page;
};

const automateInstagramStory = async () => {
  const date_obj = new Date();
  let hour = date_obj.getHours();
  hour = minimumIntegerDigits(hour > 12 ? hour - 12 : hour);
  let minute = minimumIntegerDigits(date_obj.getMinutes());
  global.schedulerCount = (global.schedulerCount || 0) + 1;
  const time_log = `Scheduler Running for ${global.schedulerCount} time at ${hour}:${minute}`;
  console.log(time_log);
  const fallback_image = `https://thumbs.dreamstime.com/b/computer-error-box-funny-fake-message-i-speechless-original-design-error-box-i-speechless-197648494.jpg`;
  const fallback_err = "Error while processing!";
  const _uploadStoryFromUrl = (story_url, is_video) => {
    ig.uploadStoryFromUrl(story_url, {
      is_video,
      callback: async (resp) => {
        !resp.success && console.log(resp?.error || fallback_err);
        await ig.exit();
      },
    });
  };
  const navigateToPage = _getRandomPage();
  const ig = new InstagramPuppet();
  ig.setBaseDir(path.relative(process.cwd(), __dirname + "/public/files/"));
  ig.setFallbackImage(fallback_image);
  await ig.initialize();
  const { CLIENT_ID, SECRET_KEY } = process.env;
  await ig.login(CLIENT_ID, SECRET_KEY);
  ig.getRandomPostFromPage(navigateToPage)
    .then((resp) => {
      console.log("resp =", resp);
      const is_video = !!resp?.node?.is_video;
      const story_url = resp?.node?.[!is_video ? "display_url" : "video_url"];
      _uploadStoryFromUrl(story_url, is_video);
    })
    .catch((err) => {
      console.log(err || fallback_err);
      _uploadStoryFromUrl(null, null);
    });
};

module.exports = { automateInstagramStory };
