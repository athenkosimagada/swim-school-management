const userController = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:id", userController.getProfile);

module.exports = router;
