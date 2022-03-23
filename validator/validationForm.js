const { check, body } = require("express-validator")
const fs = require("fs");
const path = require("path");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")))
    return users
}


const milanesa = {
    login:[
        check("email")
            .notEmpty()
            .withMessage("Campo email vacio")
            .bail()
            .isEmail()
            .withMessage("Formato de email invalido"),
        check("password")
            .notEmpty()
            .withMessage("campo password incompleto")
    ],
    register:[
        check("email")
            .notEmpty()
            .withMessage("Email vacio")
            .bail()
            .isEmail()
            .withMessage("formato de email incorrecto")
            .bail()
            .custom(function(value){
                let users = findAll()
                //busco al usuario
                let userFound = users.find(function(user){
                    return user.email == value
                })
                //si existe un usuario devuelvo el error
                if(userFound){
                    throw new Error("Email ya registrado!");
                }
                //sino devuelvo true
                return true
            })
            ,
        check("name")
            .notEmpty()
            .withMessage("campo nombre vacio"),
        check("last_name")
            .notEmpty()
            .withMessage("campo last_name vacio"),
        check("password")
            .notEmpty()
            .withMessage("campo password vacio")
    ]
}

module.exports = milanesa