const { get } = require("https");
const request = require("request");

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function keepServerAlive() {
  get("https://jwt-cracker.herokuapp.com/health", (res) => {
    if (res.statusCode === 200)
      console.log(">>>>>>>>>> SERVER IS ALIVE <<<<<<<<<<");
    else console.log(">>>>>>>>>> FAILED TO KEEP SERVER ALIVE <<<<<<<<<<");
  }).on("error", (err) => {
    console.log(">>>>>>>>>> FAILED TO KEEP SERVER ALIVE: " + err.message);
  });
  request("https://jwt-cracker.herokuapp.com/health", (err, res, body) => {
    if (err) {
      console.log(">>>>>>>>>> FAILED TO KEEP SERVER ALIVE: " + err.message);
    } else if (res?.statusCode === 200) {
      console.log(">>>>>>>>>> SERVER IS ALIVE <<<<<<<<<<");
    } else console.log(">>>>>>>>>> FAILED TO KEEP SERVER ALIVE <<<<<<<<<<");
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
};
