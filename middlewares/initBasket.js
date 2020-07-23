var cookiesManipulation = require('../utils/cookiesManipulation');
var db = require('../model/Database');

module.exports = function(req, res, next) {
    let user = req.session.user;
    res.locals.basketSize = 0;

    if (user && user.type == "User") {
        db.Menager.getBasketSizeofUser(user.login).then((size)=>{
            console.log("getBasketSizeOfUser : " + size);
            res.locals.basketSize =  size;
            next();
        });
    }  else {
        res.locals.basketSize =  cookiesManipulation.getItemCount(req);
        next();
    }
}