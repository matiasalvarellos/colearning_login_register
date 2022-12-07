const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")))
const { validationResult } = require("express-validator");
const db = require("../database/models");

function writeFile(array){
    const arrayString = JSON.stringify(array, null, 4)
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), arrayString);
}

module.exports = {
    login: async function(req, res){
        // const usersDB = await db.User.findAll();
        // const provinces = await db.Province.findAll();
        // return res.send(provinces);
        res.render("login");
    },
    register: async function(req, res){
        const provinces = await db.Province.findAll();     
        res.render("register",  { provinces: provinces });
    },
    processRegister: async function(req, res){
        try{
            const provinces = await db.Province.findAll();  
            const errors = validationResult(req)
            if(errors.errors.length > 0){
               return res.render("register", {errors: errors.mapped(), provinces: provinces})
            }
            
            const newUser = {
                // id: users.length + 1,
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                last_name: req.body.last_name,
                province_id:  req.body.province,
                avatar: req.file ? req.file.filename : "image-default"
            }
            
            await db.User.create(newUser);
    
            // users.push(newUser);
    
            // writeFile(users)
    
            res.redirect("/users/login");
        }catch(err){    
            console.log(err);
        }

    },
    processLogin: async function(req, res){
        try{
            const errors = validationResult(req);
            
            if(errors.errors.length > 0){
                res.render("login", {errorsLogin: errors.mapped()})
            }
    
            const userFound = await db.User.findOne({
                where:{
                    email: req.body.email
                }
            })
    
            if(userFound && bcrypt.compareSync(req.body.password, userFound.password)){
                //proceso session
                let user = {
                    id: userFound.id,
                    name: userFound.name,
                    last_name: userFound.last_name,
                    avatar: userFound.avatar,
                }
    
                req.session.usuarioLogueado = user
    
                if(req.body.remember){
                    res.cookie("user", user.id, {maxAge: 60000 * 24})
                }
    
                res.redirect("/")
    
            }else{
                res.render("login", {errorMsg: "Error credenciales invalidas"})
            }
        }catch(err){

        }

    },
    logout:function(req, res){
        req.session.destroy();       
        res.clearCookie("user");
        res.redirect("/");
    }
    
}