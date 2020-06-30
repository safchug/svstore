exports.form = function(req, res, next) {
    var user = req.session.user || null;
    if (user) {
        res.locals.user = user;
        res.render("salesman");
    } else {
        res.render("error", {message: "Access denied!!!"});
    }
}

class Salesman {

}