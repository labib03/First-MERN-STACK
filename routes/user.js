const express = require("express");
const { userLogin, userSignUp } = require("../controllers/userControllers");

const router = express.Router();

// login
router.post("/login", userLogin);

// signup
router.post("/signup", userSignUp);

module.exports = router;
