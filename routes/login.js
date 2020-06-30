var User = require('../model/User');
var db = require('../model/Database');

exports.form = function(req, res, next){
    res.render("login", {message: false});
}

exports.submit = function(req, res, next){
    var login = req.body.user.login;
    var pass = req.body.user.pass;
    var user = null;

    db.Menager.selectUserWithLogin(login).then((result)=>{
        if (result) {
            User.verifyPass(pass, result.hash,(match)=>{
                if(match) {
                    user = User.createUser(result);
                    user.isLogined = true;
                    req.session.user = user;

                    if(user.type == "Manager"){
                        res.redirect("/menager");
                    } else if (user.type = "Salesman") {
                        res.redirect("/selling");
                    } else {
                        res.redirect("/");
                    }
                } else {
                    res.render("login", {message: "Password is incorrect!!!"});
                }

            });
        } else {
            res.render("login", {message: "Login is incorrect!!!"});
        }
    });

}

exports.logout =  function (req, res, next) {
    req.session.destroy();
    res.locals.user = {user: {isLogined: false}};
    res.redirect("/");
}