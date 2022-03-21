const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")))
const { validationResult } = require("express-validator");

function writeFile(array){
    const arrayString = JSON.stringify(array, null, 4)
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), arrayString);
}

module.exports = {
    login: function(req, res){
        res.render("login");
    },
    register: function(req, res){
        res.render("register");
    },
    processRegister: function(req, res){
        const errors = validationResult(req)
        if(errors.errors.length > 0){
           return res.render("register", {errors: errors.mapped()})
        }
        
        const newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            last_name: req.body.last_name,
            avatar: req.file ? req.file.filename : "image-default"
        }

        users.push(newUser);

        writeFile(users)

        res.redirect("/users/login");

    }
}