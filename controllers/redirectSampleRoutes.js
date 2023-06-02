const path = require("path");
const { Url } = require("../models/Urls");

const redirectToGoogle = async (req, res) => {
  res.redirect("https://www.google.com/");
};

const redirectToGithub = async (req, res) => {
  res.redirect("https://github.com/");
};

const getEndpoints = async (req, res) => {
  //   console.log(__dirname);
  res.sendFile(
    path.join(__dirname, "..", "pages", "redirectSampleInformation.html")
  );
};

const redirectToAlias = async (req, res) => {
  try {
    let { alias } = req.params;

    let doc = await Url.findOne({ alias: alias });

    if (!doc) {
      return res.json({
        error: `There is no url with ${alias} alias`,
      });
    }

    res.redirect(doc.url);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
module.exports = {
  redirectToGithub,
  redirectToGoogle,
  getEndpoints,
  redirectToAlias,
};
