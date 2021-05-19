const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const https = require("https");
const fs = require("fs");
const { generateRandomInteger } = require("./util");
const jimp = require("jimp");

class InstagramPuppet {
  #BASE_URL = "https://instagram.com";
  #browser = null;
  #page = null;

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
    this.#browser = await puppeteer.launch({ headless: false });
    this.#page = await this.#browser.newPage();
    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
      // this.#browser.close();
    });
  };

  emulateTo = async (device_name) => {
    await this.#page.emulate(puppeteer.devices[device_name]);
  };

  login = async (username, password, options = {}) => {
    await this.#page.goto(this.#BASE_URL, { waitUntil: "networkidle2" });
    if (Array.isArray(global.instagramSession)) {
      await this.#page.setCookie(...global.instagramSession);
      return;
    }
    const loginButton = await this.#page.waitForXPath(
      '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
    );
    await loginButton.click();
    await this.#page.type("input[name=username]", username);
    await this.#page.type("input[name=password]", password);
    await this.#page.click("button[type=submit]");
    await this.#chooseLoginPreference(!!options?.saveLoginInfo);
    global.instagramSession = await this.#page.cookies();
  };

  searchFor = async (searchText) => {
    await this.#page.click(
      "#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div:nth-child(2) > a"
    );
    const search_input = "input[placeholder=Search]";
    await this.#page.waitForSelector(search_input);
    await this.#page.type(search_input, searchText);
  };

  selectSearchResult = async (options = {}) => {
    const selectSearchResult = `#react-root > section > main > div > div > ul > li:nth-child(${
      options.search_result || 1
    })`;
    await this.#page.waitForSelector(selectSearchResult);
    await this.#page.click(selectSearchResult);
  };

  goto = async (url) =>
    await this.#page.goto(url, { waitUntil: "networkidle2" });

  getRandomPostInfo = async () => {
    const post_selector = "div[class='v1Nh3 kIKUG  _bz0w']";
    await this.#page.waitForSelector(post_selector);
    const posts = await this.#page.$$(post_selector);
    const postsCount = posts.length;
    const randomlyGeneratedNumber = generateRandomInteger(0, postsCount - 1);
    const randomlySelectedPost = posts[randomlyGeneratedNumber];
    const link = await randomlySelectedPost?.$eval("a", (a) =>
      a.getAttribute("href")
    );
    return fetch(`${this.#BASE_URL}${link}?__a=1`);
  };

  getRandomImageFromPage = async (page) => {
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
    await this.#downloadStoryToLocal({
      url,
      dest: file_path,
      is_video: !!options.is_video,
      cb: async () => {
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
        this.#removeStoryFromLocal(file_path);
      },
      err: async (err) => (console.error(err), await this.exit()),
    });
  };

  exit = async () => {
    await this.#browser.close();
  };
}

module.exports = InstagramPuppet;
