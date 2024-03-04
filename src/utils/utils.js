const getRandom = (len) => {
  const random = Math.floor(Math.random() * len);
  return random;
};

module.exports = { getRandom };
