const express = require("express");
const { createAlias } = require("../controllers/postUrl");
const router = express.Router();

router.post("/", createAlias);
module.exports = router;
