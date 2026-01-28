const express = require("express");
const { authController } = require("../controllers/auth.controller");
const router = express.Router();


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get('/all-users', authController.getAllUsers);
router.post('/delete-all', authController.deleteAllUsers);

module.exports = router;
