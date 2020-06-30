
module.exports = function(req, res, next) {
    let type = req.query.who;

    let user = (type == "Salesman")? {type: "Salesman", isLogined: false}: { isLogined: false} ;

    res.locals.user = req.session.user || user;

    next();
}