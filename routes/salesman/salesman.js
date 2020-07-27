exports.form = function(req, res, next) {
    var user = req.session.user || null;
    if (user && user.type == "Salesman") {
        res.locals.user = user;
        res.render("salesman");
    } else {
        res.render("info", {message: "Access denied!!!"});
    }
}
