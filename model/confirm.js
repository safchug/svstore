var db = require("./Database");
var User = require("./User");

exports.confirmMenager = function(user, cb){
    if(user != null && user.type == "Manager") {
    db.Manager.selectUserWithLogin(user.login).then((result)=>{
        if (result) {
            if(user.hash == result.hash) {
                cb(true);
            } else {
                cb(false);
            }
        }
        });
    }
}