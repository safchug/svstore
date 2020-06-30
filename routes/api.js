var db = require("../model/Database");

exports.chackLogin = function(req, res, next) {

    var login = req.body.flogin;
    db.Menager.selectUserWithLogin(login).then((user)=>{
        if(user) {
            res.json({isTaken: true});
        }
    });
}