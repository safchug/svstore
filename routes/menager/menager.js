var db = require('../../model/Database');

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

exports.approveSalesman = function(req, res, next) {
    let login = req.body.user.login;
    res.locals.login = login;
    Menager.updateUserIsNotNew(login, function() {
        Menager.fatchNewSalesmansCountToLocals(res, ()=>{
            Menager.render(req, res, "approvedSalesman");
        });
    });
}



class Menager {
    static render(req, res, view) {
        var user = req.session.user || null;
        if (user) {
            Menager.confirm(user, (isMenager) => {
                if (isMenager) {
                    res.render(view);
                } else {
                    res.render("info", {message: "Access denied!!!"});
                }
            });
        } else {
            res.render("info", {message: "Access denied!!!"});
        }
    }

    static fatchNewSalesmansCountToLocals(res, cb) {
        db.Menager.selectNewSalesmanes().then((result) => {
            res.locals.salesmansCount = result.length || 0;
            res.locals.newSalesmansList = result || null;
            cb();
        });
    }

    static deleteUser(login, cb) {
        db.Menager.deleteUser(login).then((result)=>{
            cb();
        });
    }

    static  updateUserIsNotNew(login, cb) {
        db.Menager.updateUserIsNotNew(login).then((result)=>{
            cb();
        });
    }

    static confirm(user, cb){
        if(user != null && user.type == "Manager") {
            db.Menager.selectUserWithLogin(user.login).then((result)=>{
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
}

