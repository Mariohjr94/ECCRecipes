const express = require("express");
const router = express.Router();
const { getMyProfile } = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/me", authenticateToken, getMyProfile);

module.exports = router;
