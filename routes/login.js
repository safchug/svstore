var User = require('../model/User');
var db = require('../model/Database');
var cookiesManipulation = require('../utils/cookiesManipulation');

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
                    } else if (user.type == "Salesman" && user.isNew != true) {
                        res.redirect("/salesman");
                    } else if (user.type == "Salesman" && user.isNew) {
                        res.render("error", {message: "Please wait untill our menager approve you at this position"});
                    } else if(user.type == "User") {
                        let basketList = cookiesManipulation.getItemsList(req);
                        if(basketList != 0) {
                            db.Menager.insertBasketListForUser(user.login, basketList).then((result)=>{
                                cookiesManipulation.clearCookies(req, res);
                                res.redirect('/');
                            });
                        } else {
                            res.redirect("/");
                        }
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