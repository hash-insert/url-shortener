const Joi = require("joi");
const { Url } = require("../models/Urls");

const urlSchema = Joi.object({
  url: Joi.string().uri().required(),
  alias: Joi.string().required().min(1),
});
const createAlias = async (req, res) => {
  try {
    let { error } = await urlSchema.validateAsync(req.body);
    if (error) {
      return res.json({
        error: error.details[0].message,
      });
    }

    let checkUrl = await Url.findOne({ alias: req.body.alias });
    // console.log(checkUrl);

    if (checkUrl) {
      return res.render('landingPage', {
        aliasExistsError: "Alias already exists! Try another one :)",
        shortenedURL: null,
      });
    }

    let createUrl = await Url.create(req.body);
    res.render('landingPage', { shortenedURL: "https://url-shortener-rp1j.onrender.com/r/" + createUrl.alias + "/" });
    
  } catch (error) {
    console.log(error);
    res.json({
      error: error.details[0].message,
    });
  }
};

module.exports = { createAlias };
