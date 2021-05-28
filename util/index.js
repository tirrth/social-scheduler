const path = require("path");
const request = (url, ...args) => {
  const input_url = new URL(url);
  const adapters = {
    "http:": require("http"),
    "https:": require("https"),
  };
  return adapters[input_url.protocol].get(url, ...args);
};
function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function minimumIntegerDigits(number, minimumIntegerDigits = 2) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits,
    useGrouping: false,
  });
}

function keepServerAlive() {
  const time = currentTime();
  global.healthCheckCount = (global.healthCheckCount || 0) + 1;
  const health_check_count = ordinal_suffix_of(global.healthCheckCount);
  const time_log = `\n>>>>>>>>>>>>>>>>>>>> Health Checker Running for ${health_check_count} time at ${time} <<<<<<<<<<<<<<<<<<<<\n`;
  console.log(time_log);
  request("https://social-scheduler.herokuapp.com/health", (res) => {
    if (res.statusCode === 200) {
      console.log(`SERVER IS ALIVE: SUCCESSFUL HEALTH CHECK-UP`);
    } else console.log(`FAILED TO KEEP SERVER ALIVE: HEALTH CHECK-UP ABORTED`);
    const time = currentTime();
    const time_log = `\n>>>>>>>>>>>>>>>>>>>>>>>>>> Health Checker Stopping at ${time} <<<<<<<<<<<<<<<<<<<<<<<<<<\n`;
    console.log(time_log);
  }).on("error", (err) => {
    console.log("FAILED TO KEEP SERVER ALIVE: " + err.message);
  });
}

function currentTime(seperator = ":") {
  const date_obj = new Date();
  let hour = date_obj.getHours();
  hour = minimumIntegerDigits(hour > 12 ? hour - 12 : hour);
  const minute = minimumIntegerDigits(date_obj.getMinutes());
  const second = minimumIntegerDigits(date_obj.getSeconds());
  return `${hour}${seperator}${minute}${seperator}${second}`;
}

function automateInstagramStory() {
  const InstagramPuppet = require("../scrappers/instagram");
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
    return instagram_page[random_page_no];
  };

  (async () => {
    const time = currentTime();
    global.schedulerCount = (global.schedulerCount || 0) + 1;
    const scheduler_count = ordinal_suffix_of(global.schedulerCount);
    const time_log = `\n>>>>>>>>>>>>>>>>>>>>>>>>>> Scheduler Running for ${scheduler_count} time at ${time} <<<<<<<<<<<<<<<<<<<<<<<<<<\n`;
    console.log(time_log);
    const fallback_images = [
      `https://thumbs.dreamstime.com/b/computer-error-box-funny-fake-message-i-speechless-original-design-error-box-i-speechless-197648494.jpg`,
      `https://media.istockphoto.com/vectors/window-operating-system-error-warning-illustration-on-white-isolated-vector-id943008240?k=6&m=943008240&s=612x612&w=0&h=4LxxYIytSex0wQjHDJ8uBlzXWMsJ2Tw1Y9fhb_aqBmE=`,
      `https://media.istockphoto.com/vectors/classic-window-alert-dialog-box-of-system-error-vector-id1155863502?k=6&m=1155863502&s=612x612&w=0&h=1dFjk7hyL5B6cbRt0mPA_yoYet7ONJuBIvU_PP86AU4=`,
      `https://media.istockphoto.com/photos/computer-showing-an-error-message-picture-id155384933?k=6&m=155384933&s=612x612&w=0&h=uw4hhmOyXLmIsaEqL2b-veOarMbsNIYnrSVAFVG8N6E=`,
      `https://media.istockphoto.com/vectors/modern-pc-window-user-interface-design-app-web-browser-system-dialog-vector-id1188370330?k=6&m=1188370330&s=612x612&w=0&h=XVjgtKo9A4fHvyReBQxs8vEPxM270pXmrEnG6h38OAI=`,
      `https://media.istockphoto.com/photos/error-and-oops-picture-id874473666?k=6&m=874473666&s=612x612&w=0&h=ZvFDJwp00RI_cnnHbmCVEf3o1MaIn11GPF2vhoKx2DM=`,
      `https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png`,
      `https://i.pinimg.com/736x/7d/05/e9/7d05e971b1c961c05332bde829386e8e.jpg`,
      `https://wphelp.blog/wp-content/uploads/2021/02/system-error.jpg`,
      `https://www.thesslstore.com/blog/wp-content/uploads/2018/10/bigstock-Error-Page-Not-Found-Conce-243784411.jpg`,
    ];
    const fallback_err = "Error while processing!";
    const _uploadStoryFromUrl = (story_url, is_video) => {
      ig.uploadStoryFromUrl(story_url, {
        is_video,
        callback: async (resp) => {
          !resp.success && console.log(resp?.error || fallback_err);
          await ig.exit();
          const time = currentTime(":");
          const time_log = `\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Scheduler Stopping at ${time} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n`;
          console.log(time_log);
        },
      });
    };
    const navigateToPage = _getRandomPage();
    const ig = new InstagramPuppet();
    const relative_path = "/../public/files/";
    const base_dir = path.relative(process.cwd(), __dirname + relative_path);
    ig.setBaseDir(base_dir);
    ig.setFallbackImages(fallback_images);
    await ig.initialize();
    const { CLIENT_ID, SECRET_KEY } = process.env;
    await ig.login(CLIENT_ID, SECRET_KEY);
    ig.getRandomPostFromPage(navigateToPage)
      .then((resp) => {
        const is_video = !!resp?.node?.is_video;
        const story_url = resp?.node?.[!is_video ? "display_url" : "video_url"];
        _uploadStoryFromUrl(story_url, is_video);
      })
      .catch((err) => {
        console.log(err || fallback_err);
        _uploadStoryFromUrl(null, null);
      });
  })();
}

module.exports = {
  generateRandomInteger,
  minimumIntegerDigits,
  keepServerAlive,
  automateInstagramStory,
};
