var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/user", function(req, res){
  if(req.session.user){
    res.send(req.session.user)
  }else{
    res.send("no hay ningun usuario en sesion")
  }
})

module.exports = router;
