var db = require("../model/Database");
var findoutSection = require('../utils/findOutSection');
var cookiesManipulation = require('../utils/cookiesManipulation');

exports.chackLogin = function(req, res, next) {

    var login = req.body.flogin;
    db.Menager.selectUserWithLogin(login).then((user)=>{
        if(user) {
            res.json({isTaken: true});
        }
    });
}

exports.addToBasket = function(req, res, next) {
    let lot = req.body.lot;
    let section = findoutSection(req.body.url);
    let lotsCount = 0;
    let user = res.locals.user;
    console.log("user: " + user);

    if(user.isLogined) {
        let item = {login: user.login, section: section, title: lot};
        db.Menager.insertBasketItem(item).then((result)=> {
            db.Menager.getBasketSizeofUser(user.login).then((count)=> {
                console.log("add to basket get count: " + count);
                res.json({count: count});
            });
        });
    } else {
        lotsCount = cookiesManipulation.addBasketItem(req, res);
        res.json({count: lotsCount});
    }

}

exports.getBasketList = function (req, res, next) {
    let user = res.locals.user;

    console.log("getBasketList");

    if(user.isLogined) {
        db.Menager.selectBasketListOfUser(user.login).then((list)=> {
            res.json(list);
        });
    } else {
        let arr = cookiesManipulation.getItemsList(req);

        db.Menager.selectBasketList(arr).then((list)=> {
            console.log(list);
            res.json(list);
        });
    }

}

exports.removeBasketItem = function (req, res, next) {
    let user = req.session.user || null;
    let lot = req.body.lot;

    if (user) {
        db.Menager.deleteBasketItem(user.login, lot).then((result)=>{
            res.json({status: 'OK'});
        });
    } else  {
        cookiesManipulation.deleteCoockie(req, res, lot);
        res.json({status: 'OK'});
    }
}