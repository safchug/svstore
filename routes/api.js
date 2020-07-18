var db = require("../model/Database");
var findoutSection = require('../utils/findOutSection');

exports.chackLogin = function(req, res, next) {

    var login = req.body.flogin;
    db.Menager.selectUserWithLogin(login).then((user)=>{
        if(user) {
            res.json({isTaken: true});
        }
    });
}

exports.addToBasket = function(req, res, next) {
    let lotsCount = 0;
    let lot = req.body.lot;
    let section = findoutSection(req.body.url);

    for(key in req.cookies) {
        if(key.indexOf('store_lot_') != -1) {
            lotsCount++;
            console.log("++++++++AJAX+++++++++++++");
            console.log(req.cookies[key]);
        }
    }

    if(lotsCount == 0) {
        res.cookie("store_lot_1" + "|" + section, lot, { maxAge: 1000 * 60 * 60 * 24 * 7 * 2, httpOnly: true });
    } else {
        lotsCount++;
        let cookieName = "store_lot_" + lotsCount + "|" + section;

        res.cookie(cookieName, lot, { maxAge: 1000 * 60 * 60 * 24 * 7 * 2, httpOnly: true });
    }

    res.json({count: lotsCount});
}

exports.getBasketList = function (req, res, next) {
    let user = res.locals.user;

    console.log("getBasketList");
    if(!user.isLogined) {
        let arr = [];

        console.log("!user.isLogined");
        for(key in req.cookies) {
            if(key.indexOf('store_lot_') != -1) {
                let obj = {};
                let cokieNameParts = key.split("|");

                obj.section = cokieNameParts[1];
                obj.title = req.cookies[key];

                arr.push(obj);
            }
        }

        db.Menager.selectBasketList(arr).then((list)=> {
           res.json(list);
        });
    }
}

exports.clearCookies = function(req, res, next) {
    for(key in req.cookies) {
        if(key.indexOf('store_lot_') != -1) {
            console.log("I was here!");
            res.clearCookie(key);
        }
    }

    let arr = [];

    for(key in req.cookies) {
        if(key.indexOf('store_lot_') != -1) {
            arr.push(req.cookies[key]);
        }
    }

    console.log(arr);

    res.end('done');
}