const { Url } = require("../models/Urls");
const Joi = require("joi");
const crypto = require('crypto');

const urlSchema = Joi.object({
    url: Joi.string().uri().required(),
    alias: Joi.string().allow('').optional().trim(),
  });
function generateRandomKey(input) {
    const timestamp = new Date().getTime().toString();
    const data = input + timestamp;

    const hash = crypto.createHash('md5').update(data).digest('hex');
    const key = hash.slice(0, 8);

    return key;
}

const createHash = async (req, res) => {
    try {
        let { error } = await urlSchema.validateAsync(req.body);
        if (error) {
            return res.json({
                error: error.details[0].message,
            });
        }
        const longURL = req.body.url;
        console.log(longURL);

        let doc = await Url.findOne({ url: longURL });

        if (doc) {
            res.render('landingPage', { shortenedURL: "https://url-shortener-rp1j.onrender.com/r/" + doc.alias + "/" })
        }
        else {
            let key = generateRandomKey(longURL);
            let createUrl = await Url.create({ url: longURL, alias: key });
            res.render('landingPage', { shortenedURL: "https://url-shortener-rp1j.onrender.com/r/" + key + "/" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            error: error.details[0].message,
        });
    }

}

module.exports = { createHash };
