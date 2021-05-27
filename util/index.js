const request = (url, ...args) => {
  const input_url = new URL(url);
  const adapters = {
    "http:": require("http"),
    "https:": require("https"),
  };
  return adapters[input_url.protocol].get(url, ...args);
};

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function keepServerAlive() {
  request("https://social-scheduler.herokuapp.com/health", (res) => {
    if (res.statusCode === 200) {
      console.log(">>>>>>>>>> SERVER IS ALIVE <<<<<<<<<<");
    } else console.log(">>>>>>>>>> FAILED TO KEEP SERVER ALIVE <<<<<<<<<<");
  }).on("error", (err) => {
    console.log(">>>>>>>>>> FAILED TO KEEP SERVER ALIVE: " + err.message);
  });
}

function minimumIntegerDigits(number, minimumIntegerDigits = 2) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits,
    useGrouping: false,
  });
}

module.exports = {
  generateRandomInteger,
  minimumIntegerDigits,
  keepServerAlive,
  request,
};