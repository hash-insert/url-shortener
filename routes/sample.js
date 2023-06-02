const express = require("express");
const {
  getGoogleUrl,
  getGithubUrl,
  getEndpoints,
} = require("../controllers/sample");

const router = express.Router();

router.get("/google", getGoogleUrl);
router.get("/github", getGithubUrl);
router.get("/", getEndpoints);

module.exports = router;
