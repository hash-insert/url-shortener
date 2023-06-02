const express = require("express");
const {
  redirectToGoogle,
  redirectToGithub,
  getEndpoints,
  redirectToAlias,
} = require("../controllers/redirectSampleRoutes");

const router = express.Router();

router.get("/google", redirectToGoogle);
router.get("/github", redirectToGithub);
router.get("/", getEndpoints);
router.get("/:alias", redirectToAlias);
module.exports = router;
