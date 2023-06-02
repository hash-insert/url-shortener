const express = require("express");
const { createHash } = require("../controllers/createHash");
const router = express.Router();

router.post("/", createHash);
module.exports = router;
