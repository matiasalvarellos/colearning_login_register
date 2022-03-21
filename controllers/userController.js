const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const { validationResult } = require("express-validator");

const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")))

function writeFile(array){
    const usersString = JSON.stringify(array, null, 4);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), usersString);
}

module.exports = {
    login: function(req, res){
        res.render("login");
    },
    register: function(req, res){
        res.render("register");
    },
    processRegister: function(req, res){
        
        const errors = validationResult(req);

        if(errors.errors.length > 1){
           return res.render("register", {errors: errors.array(), old: req.body}) 
        }
        let newUser = {
            email: req.body.email,
            name: req.body.name,
            last_name: req.body.last_name,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        users.push(newUser);

        writeFile(users)

        res.redirect("/");            
        
    },
    processLogin: function(req, res){
        const errors = validationResult(req);
        if(errors.errors.length > 1){

        }
        let user = users.find(user=>{
            return user.email == req.body.email;
        })
        delete user.password;
        
        req.session.userLogged = user;

        if(req.body.recordar){
            res.cookie("recordar", user, {maxAge: 60000 * 24})
        }
        res.redirect("/")
        
    }
}