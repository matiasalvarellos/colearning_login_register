const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator")
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")))
/* GET users listing. */

//register
router.get("/register", userController.register);
router.post("/register", [ 
  body("name")
    .notEmpty()
    .withMessage("campo nombre vacio"),
  body("email")
    .notEmpty()
    .withMessage("campo email vacio")
    .bail()
    .isEmail()
    .withMessage("formato desconocido"),
],
 userController.processRegister
);

//login
router.get('/login', userController.login);
router.post("/login",[ 
  body("email")
    .notEmpty()
    .withMessage("campo email vacio")
    .bail()
    .isEmail()
    .withMessage("formato desconocido"),
  body("password")
    .notEmpty()
    .withMessage("campo password vacio")
    .custom(function(value, {req}){
      let usuarioFound = users.find(function(user){
        return user.email == req.body.email && bcrypt.compareSync(value, usuarioFound.password) ;
      })
      if(!usuarioFound){
        throw new Error("Error en las credenciales")
      }
    })
] 
,userController.processLogin);


module.exports = router;
