var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user || null;
  if(user) {
    if(user.type == "Manager") {
      res.redirect("/menager");
    } else if (user.type == "Salesman") {
      res.redirect("/salesman");
    } else {
      res.render('index');
    }
  } else {
    res.render('index');
  }
});

module.exports = router;
