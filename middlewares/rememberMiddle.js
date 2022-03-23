const fs = require("fs");
const path = require("path");
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")))

function rememberMiddleware(req, res, next){
    
    if(req.cookies.user && !req.session.user){
        let userFound = users.find(function(user){
            return user.id == req.cookies.user;
        })

        let usuarioInfo ={
            email: userFound.email,
            name: userFound.name,
            last_name: userFound.last_name,
            avatar: userFound.avatar
        }

        req.session.user = usuarioInfo;
        return next();

    }else{
       return next()
    }
}

module.exports = rememberMiddleware;