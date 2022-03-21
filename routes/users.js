const path = require("path");
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const { body } = require("express-validator");
const validator = require("../validator/validationForm");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images/avatars"));
    },
    filename: function (req, file, cb) {
 
      cb(null, file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname));
    }
});

const upload = multer({ storage })

/* GET users listing. */

//register
router.get("/register", userController.register);
router.post("/register", upload.single("avatar"), validator.register ,userController.processRegister);

//login
router.get('/login', userController.login);


module.exports = router;
