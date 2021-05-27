function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const minimumIntegerDigits = (number, minimumIntegerDigits = 2) => {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits,
    useGrouping: false,
  });
};

module.exports = { generateRandomInteger, minimumIntegerDigits };
