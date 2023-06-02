const { Url } = require("../models/Urls");

const getUrls = async (req, res) => {
  try {
    let urls = await Url.find();
    res.json(urls);
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { getUrls };
