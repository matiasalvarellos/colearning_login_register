const fs = require("fs");
const path = require("path");
const db = require("../database/models");

function findAll(){
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));
    return users;
}

function recordame (req, res , next){
    if(!req.session.usuarioLogueado && req.cookies.user){
        // let users = findAll()
        // const usuarioCookies = users.find(function(user){
        //     return user.id == req.cookies.user
        // })
        db.User.findOne({
            where:{
                id: req.cookies.user
            }
        }).then(function(user){
            let user = {
                id: usuarioCookies.id,
                name: usuarioCookies.name,
                last_name: usuarioCookies.last_name,
                avatar: usuarioCookies.avatar,
            }
    
            req.session.usuarioLogueado = user;
    
            return next()
        })

    }else{
        return next()
    }
}
module.exports = recordame;