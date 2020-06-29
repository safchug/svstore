var db = require('../../model/Database');
var confirm = require("../../model/confirm");

exports.form = function (req, res, next) {
    Menager.fatchNewSalesmansCountToLocals(res, () => {
        Menager.render(req, res,"menager");
    });

}

exports.sellings = function(req, res, next) {
    Menager.fatchNewSalesmansCountToLocals(res, () => {
        Menager.render(req, res,"sellings");
    });
}

exports.createMenager = function(req, res, next) {
    Menager.fatchNewSalesmansCountToLocals(res, () => {
        Menager.render(req, res,"create_menager");
    });
}

exports.approveForm = function(req, res, next) {
    Menager.fatchNewSalesmansCountToLocals(res, ()=> {
        Menager.render(req, res, "approve");
    })
}

exports.reject = function(req, res, next) {
    let login = req.body.user.login;
    res.locals.login = login;
    Menager.deleteUser(login, function() {
        Menager.fatchNewSalesmansCountToLocals(res, ()=>{
            Menager.render(req, res, "reject");
        });
    });
}



class Menager {
    static render(req, res, view) {
        var user = req.session.user || null;
        if (user) {
            confirm.confirmMenager(user, (isMenager) => {
                if (isMenager) {
                    res.render(view);
                } else {
                    res.render("error", {message: "Access denied!!!"});
                }
            });
        } else {
            res.render("error", {message: "Access denied!!!"});
        }
    }

    static fatchNewSalesmansCountToLocals(res, cb) {
        db.Manager.selectNewSalesmanes().then((result) => {
            res.locals.salesmansCount = result.length || 0;
            res.locals.newSalesmansList = result || null;
            cb();
        });
    }

    static deleteUser(login, cb) {
        db.Manager.deleteUser(login).then((result)=>{
            cb();
        });
    }

}

