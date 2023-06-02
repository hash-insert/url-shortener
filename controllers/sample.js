const path = require("path");

const getGoogleUrl = async (req, res) => {
  let aElement = `<a href="https://www.google.com/">https://www.google.com/</a>`;
  res.send(aElement);
};

const getGithubUrl = async (req, res) => {
  let aElement = '<a href="https://github.com/">https://github.com/</a>';
  res.send(aElement);
};

const getEndpoints = async (req, res) => {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname, "..", "pages", "information.html"));
};
module.exports = {
  getGithubUrl,
  getGoogleUrl,
  getEndpoints,
};
