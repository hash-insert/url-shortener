const express = require("express");
const { getUrls } = require("../controllers/getUrls");
const router = express.Router();

router.get("/", getUrls);
module.exports = router;
