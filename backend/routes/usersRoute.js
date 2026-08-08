const express = require("express");
const router = express.Router();
// ------------------------------

const { verifyCredentials } = require("../controller/usersController");
// -----------------------------
router.route("/userLogin").post(verifyCredentials);

module.exports = router;
