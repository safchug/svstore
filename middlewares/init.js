
module.exports = function(req, res, next) {
    res.locals.user = req.session.user || {user:{isLogined: false}};
    next();
}