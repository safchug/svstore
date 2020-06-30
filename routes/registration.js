var db = require("../model/Database");
var User = require('../model/User');

exports.regist = function(req, res, next) {
    var username = req.body.user.name,
        usersurname = req.body.user.surname,
        login = req.body.user.login,
        pass = req.body.user.pass,
        type = req.body.user.type,
        phone = req.body.user.phone;
    user = new User(username, usersurname, login, type, phone, false);

    if(type == "Salesman") {
        user.isNew = true;
        res.locals.user = user;
    }

    user.hashPass(pass, ()=> {
        db.Menager.insertUser(user).then((result) => {
            let user = result.ops[0];

            if(user.type == "Salesman") {
                res.redirect('/greetings?who=Salesman');
            } else {
                res.redirect('/greetings');
            }

        });
    });
}

exports.form = function(req, res, next) {
    res.render("regist");
}

exports.greetings = function(req, res, next) {
    res.render("greetings");
}
