const fs = require("fs");
const path = require("path");
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")))

module.exports = {
    login: function(req, res){
        res.render("login");
    },
    register: function(req, res){
        res.render("register");
    }
}