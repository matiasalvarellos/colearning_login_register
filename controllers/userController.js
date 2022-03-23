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

    },
    processLogin: function(req, res){
        const errors = validationResult(req);
        if(req.body.remember){
            console.log(req.body.remember)
        }
        if(errors.errors.length > 0){
            res.render("login", {errors: errors.errors})
        }
        
        let userFound = users.find(function(user){
            return user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)
        })
        
        if(userFound){
            //dejar al usuario en sesion
            delete userFound.password;

            let usuarioInfo ={
                email: userFound.email,
                name: userFound.name,
                last_name: userFound.last_name,
                avatar: userFound.avatar
            }

            req.session.user = usuarioInfo;

            if(req.body.remember){
                res.cookie("user", userFound.id, {maxAge: 60000 * 24})
            }
            res.redirect("/user")
        }else{
            res.render("login", { errorLogin: "Error credenciales incorrectas!" })
        }
        

    }
}