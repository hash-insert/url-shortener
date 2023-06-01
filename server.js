const express = require('express');
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const ShortUrl = require("./models/schema");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to mongoDB :", err);
  });

app.get("/", async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.render("index", { shortUrls: shortUrls });
  } catch (error) {
    console.log("Error fetching short URLs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/shortUrls", async (req, res) => {
  const { alias } = req.body;
  let shortUrl;

  generateShortUrl = () => {
    const length = 7;
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  };

  try {
    if (alias) {
      const existingAlias = await ShortUrl.findOne({ short: alias });
      if (existingAlias) {
        return res
          .status(400)
          .send("Alias is already taken. Please choose a different alias.");
      }
      shortUrl = alias;
    } else {
      shortUrl = generateShortUrl();
    }

    await ShortUrl.create({ full: req.body.fullUrl, short: shortUrl });
    res.redirect("/");
  } catch (error) {
    console.log("Error creating short URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (!shortUrl) {
      res.status(404).send(`Not found the short URL`);
    }
    await shortUrl.save();
    res.redirect(shortUrl.full);
  } catch (error) {
    console.log(`Error redirecting short URL :`, error);
    res.status(500).send(`Internal Server Error`);
  }
});

app.listen(port, () => {
  console.log(`Server listening to port : ${port}`);
});