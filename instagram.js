const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

const BASE_URL = "https://www.instagram.com";

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({ headless: false });
    instagram.page = await instagram.browser.newPage();
  },

  emulateTo: async (device_name) => {
    await instagram.page.emulate(puppeteer.devices[device_name]);
  },

  login: async (username, password, options) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });
    const loginButton = await instagram.page.waitForXPath(
      '//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]'
    );
    await loginButton.click();
    await instagram.page.type("input[name=username]", username);
    await instagram.page.type("input[name=password]", password);
    await instagram.page.click("button[type=submit]");
    const login_preference = `#react-root > section > main > div > div > ${
      options.saveLoginInfo ? "section > " : ""
    }div > button`;
    await instagram.page.waitForSelector(login_preference);
    await instagram.page.click(login_preference);
    const app_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
      options.addInstagramToHomeScreen ? "bIiDR" : "HoLwm"
    }`;
    await instagram.page.waitForSelector(app_preference);
    await instagram.page.click(app_preference);
    const notification_preference = `body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.${
      options.allowNotifications ? "bIiDR" : "HoLwm"
    }`;
    await instagram.page.waitForSelector(notification_preference, {
      timeout: 10000,
    });
    await instagram.page.click(notification_preference);
  },

  searchFor: async (searchText) => {
    await instagram.page.click(
      "#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div:nth-child(2) > a"
    );
    const search_input = "input[placeholder=Search]";
    await instagram.page.waitForSelector(search_input);
    await instagram.page.type(search_input, searchText);
  },

  selectSearchResult: async (options) => {
    const selectSearchResult = `#react-root > section > main > div > div > ul > li:nth-child(${
      options.search_result || 1
    })`;
    await instagram.page.waitForSelector(selectSearchResult);
    await instagram.page.click(selectSearchResult);
  },

  getRandomPostInfo: async () => {
    const post_selector = "div[class='Nnq7C weEfm']";
    await instagram.page.waitForSelector(post_selector);
    const posts = await instagram.page.$$(post_selector);
    const postsCount = posts.length;
    const randomlyGeneratedNumber = generateRandomInteger(0, postsCount);
    const randomlySelectedPost = posts[randomlyGeneratedNumber];
    const link = await randomlySelectedPost?.$eval("a", (a) =>
      a.getAttribute("href")
    );
    return fetch(`${BASE_URL}${link}?__a=1`)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  },
};

module.exports = instagram;
