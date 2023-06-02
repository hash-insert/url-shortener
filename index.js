const express = require("express");
const app = express();
const port = 5000;
// step2 import
const sampleRouter = require("./routes/sample");
const postUrl = require("./routes/postUrl");
const getUrls = require("./routes/getUrls");
require("dotenv/config");
const mongoose = require("mongoose");
const redirectSampleRouter = require("./routes/redirectSampleRoutes");
const shortenUrl = require("./routes/shortenUrl.js")

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  const shortenedURL = '';
  const aliasExistsError = "";
  res.render('landingPage',{ shortenedURL, aliasExistsError });
});
// step2
app.use("/i", sampleRouter);
app.use("/map", postUrl);
app.use("/mappings", getUrls);
app.use("/r", redirectSampleRouter);
app.use("/shorten",shortenUrl)

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to DB.`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(`error -> ${error}`);
  }
};

startServer();