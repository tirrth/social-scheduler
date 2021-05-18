const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const fs = require("fs");
const https = require("https");

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const BASE_URL = "https://instagram.com";

class InstagramPuppet {
  browser = null;
  page = null;

  #chooseAppPreference = async (add_to_home) => {
    const app_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
      add_to_home ? "bIiDR" : "HoLwm"
    }`;
    await this.page.waitForSelector(app_preference);
    await this.page.click(app_preference);
  };

  #chooseNotificationPreference = async (allow_notifications) => {
    const notification_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
      allow_notifications ? "bIiDR" : "HoLwm"
    }`;
    await this.page.waitForSelector(notification_preference, {
      timeout: 10000,
    });
    await this.page.click(notification_preference);
  };

  #chooseLoginPreference = async (save_login_info) => {
    const login_preference = `#react-root > section > main > div > div > ${
      save_login_info ? "section > " : ""
    }div > button`;
    await this.page.waitForSelector(login_preference);
    await this.page.click(login_preference);
  };

  initialize = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
  };

  emulateTo = async (device_name) => {
    await this.page.emulate(puppeteer.devices[device_name]);
  };

  login = async (username, password, options = {}) => {
    await this.page.goto(BASE_URL, { waitUntil: "networkidle2" });
    if (Array.isArray(global.instagramSession)) {
      await this.page.setCookie(...global.instagramSession);
      return;
    }
    const loginButton = await this.page.waitForXPath(
      '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
    );
    await loginButton.click();
    await this.page.type("input[name=username]", username);
    await this.page.type("input[name=password]", password);
    await this.page.click("button[type=submit]");
    await this.#chooseLoginPreference(!!options?.saveLoginInfo);
    await this.#chooseAppPreference(!!options?.addInstagramToHomeScreen);
    await this.#chooseNotificationPreference(!!options?.allowNotifications);
    global.instagramSession = await this.page.cookies();
  };

  searchFor = async (searchText) => {
    await this.page.click(
      "#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div:nth-child(2) > a"
    );
    const search_input = "input[placeholder=Search]";
    await this.page.waitForSelector(search_input);
    await this.page.type(search_input, searchText);
  };

  selectSearchResult = async (options = {}) => {
    const selectSearchResult = `#react-root > section > main > div > div > ul > li:nth-child(${
      options.search_result || 1
    })`;
    await this.page.waitForSelector(selectSearchResult);
    await this.page.click(selectSearchResult);
  };

  goto = async (url) => {
    await this.page.goto(url, { waitUntil: "networkidle2" });
  };

  getRandomPostInfo = async () => {
    const post_selector = "div[class='v1Nh3 kIKUG  _bz0w']";
    await this.page.waitForSelector(post_selector);
    const posts = await this.page.$$(post_selector);
    const postsCount = posts.length;
    const randomlyGeneratedNumber = generateRandomInteger(0, postsCount);
    const randomlySelectedPost = posts[randomlyGeneratedNumber];
    const link = await randomlySelectedPost?.$eval("a", (a) =>
      a.getAttribute("href")
    );
    return fetch(`${BASE_URL}${link}?__a=1`);
  };

  downloadFileToLocal = (url, dest, cb) => {
    // console.log("url =", url);
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

  removeFileFromLocal = (file_path) => {
    try {
      fs.unlinkSync(file_path);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  uploadStory = async (file_path, options = {}) => {
    // await this.page.click(
    //   "#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div:nth-child(1) > a"
    // );
    await this.goto(BASE_URL);
    await this.#chooseAppPreference(!!options?.addInstagramToHomeScreen);
    const camera_selector = "button[class='mTGkH']";
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(camera_selector),
    ]);
    fileChooser.isMultiple(false);
    await fileChooser.accept([file_path]);
    const upload_btn = await this.page.waitForXPath(
      '//*[@id="react-root"]/section/footer/div/div/button'
    );
    await upload_btn.click();
    await this.page.waitForXPath("/html/body/div[3]/div/div/div/p", {
      visible: true,
    });
  };

  exit = async () => {
    await this.browser.close();
  };
}

// const instagram = {
//   browser: null,
//   page: null,
//   getInstagramSession: global?.instagramSession || null,

//   initialize: async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     this.browser = browser;
//     this.page = page;
//   },

//   emulateTo: async (device_name) => {
//     await this.page.emulate(puppeteer.devices[device_name]);
//   },

//   login: async (username, password, options = {}) => {
//     await this.page.goto(BASE_URL, { waitUntil: "networkidle2" });
//     console.log("getInstagramSession =", this.getInstagramSession);
//     if (!this.getInstagramSession) {
//       const loginButton = await this.page.waitForXPath(
//         '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
//       );
//       await loginButton.click();
//       await this.page.type("input[name=username]", username);
//       await this.page.type("input[name=password]", password);
//       await this.page.click("button[type=submit]");
//       const login_preference = `#react-root > section > main > div > div > ${
//         options.saveLoginInfo ? "section > " : ""
//       }div > button`;
//       await this.page.waitForSelector(login_preference);
//       await this.page.click(login_preference);
//       const app_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
//         options.addInstagramToHomeScreen ? "bIiDR" : "HoLwm"
//       }`;
//       await this.page.waitForSelector(app_preference);
//       await this.page.click(app_preference);
//       const notification_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
//         options.allowNotifications ? "bIiDR" : "HoLwm"
//       }`;
//       await this.page.waitForSelector(notification_preference, {
//         timeout: 10000,
//       });
//       await this.page.click(notification_preference);
//       global.instagramSession = await this.page.cookies();
//     } else {
//       await this.page.setCookie(...global.instagramSession);
//     }
//   },

//   searchFor: async (searchText) => {
//     await this.page.click(
//       "#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div:nth-child(2) > a"
//     );
//     const search_input = "input[placeholder=Search]";
//     await this.page.waitForSelector(search_input);
//     await this.page.type(search_input, searchText);
//   },

//   selectSearchResult: async (options = {}) => {
//     const selectSearchResult = `#react-root > section > main > div > div > ul > li:nth-child(${
//       options.search_result || 1
//     })`;
//     await this.page.waitForSelector(selectSearchResult);
//     await this.page.click(selectSearchResult);
//   },

//   goto: async (url) => {
//     await this.page.goto(url, { waitUntil: "networkidle2" });
//   },

//   getRandomPostInfo: async () => {
//     const post_selector = "div[class='v1Nh3 kIKUG  _bz0w']";
//     await this.page.waitForSelector(post_selector);
//     const posts = await this.page.$$(post_selector);
//     const postsCount = posts.length;
//     const randomlyGeneratedNumber = generateRandomInteger(0, postsCount);
//     const randomlySelectedPost = posts[randomlyGeneratedNumber];
//     const link = await randomlySelectedPost?.$eval("a", (a) =>
//       a.getAttribute("href")
//     );
//     return fetch(`${BASE_URL}${link}?__a=1`);
//   },

//   downloadFileToLocal: (url, dest, cb) => {
//     console.log("url =", url, dest, cb);
//     const file = fs.createWriteStream(dest);
//     const request = https.get(url, (response) => {
//       // check if response is success
//       if (response.statusCode !== 200) {
//         return cb("Response status was " + response.statusCode);
//       }
//       response.pipe(file);
//     });
//     // close() is async, call cb after close completes
//     file.on("finish", () => file.close(cb));
//     // check for request error too
//     request.on("error", (err) => {
//       fs.unlink(dest);
//       return cb(err?.message);
//     });
//     file.on("error", (err) => {
//       // Handle errors
//       fs.unlink(dest); // Delete the file async. (But we don't check the result)
//       return cb(err?.message);
//     });
//   },

//   removeFileFromLocal: (file_path) => {
//     try {
//       fs.unlinkSync(file_path);
//     } catch (err) {
//       console.log("Error: ", err);
//     }
//   },

//   uploadStory: async (file_path) => {
//     await this.page.click(
//       "#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div:nth-child(1) > a"
//     );
//     const camera_selector = "button[class='mTGkH']";
//     const [fileChooser] = await Promise.all([
//       this.page.waitForFileChooser(),
//       this.page.waitForSelector(camera_selector),
//       this.page.click(camera_selector),
//     ]);
//     fileChooser.isMultiple(false);
//     await fileChooser.accept([file_path]);
//     const upload_btn = await this.page.waitForXPath(
//       '//*[@id="react-root"]/section/footer/div/div/button'
//     );
//     await upload_btn.click();
//     await this.page.waitForXPath("/html/body/div[3]/div/div/div/p", {
//       visible: true,
//     });
//   },
// };

module.exports = InstagramPuppet;
