const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */

//register
router.get("/register", userController.register);

//login
router.get('/login', userController.login);


module.exports = router;
