var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.usuarioLogueado)
  res.render('index', { title: 'Express' });
});
router.get("/profile", function(req, res){
  console.log(req.session.usuarioLogueado)
  if(req.session.usuarioLogueado){
    res.send("Hola "+ req.session.usuarioLogueado.name)
  }else{
    res.send("no estas logueado")
  }
})

module.exports = router;
