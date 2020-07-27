var findoutSection = require('../utils/findOutSection');

exports.addBasketItem = function(req, res) {

    let lotsCount = 0;
    for(key in req.cookies) {
        if(key.indexOf('store_lot_') != -1) {
            lotsCount++;
            console.log("++++++++AJAX+++++++++++++");
            console.log(req.cookies[key]);
        }
    }

    let lot = req.body.lot;
    let section = findoutSection(req.body.url);

    if(lotsCount == 0) {
        res.cookie("store_lot_1" + "|" + section, lot, { maxAge: 1000 * 60 * 60 * 24 * 7 * 2, httpOnly: true });
        lotsCount++;
    } else {
        lotsCount++;
        let cookieName = "store_lot_" + lotsCount + "|" + section;

        res.cookie(cookieName, lot, { maxAge: 1000 * 60 * 60 * 24 * 7 * 2, httpOnly: true });
    }

    return lotsCount;
}

exports.getItemsList = function (req) {
    let arr = [];

    for(key in req.cookies) {
        if(key.indexOf('store_lot_') != -1) {
            let obj = {};
            let cokieNameParts = key.split("|");

            obj.section = cokieNameParts[1];
            obj.title = req.cookies[key];

            arr.push(obj);
        }
    }

    return arr;
}

exports.getItemCount = function(req) {
    let lotsCount = 0;

    for(key in req.cookies) {
        if(key.indexOf('store_lot_') != -1) {
            lotsCount++;
            console.log("++++++++AJAX+++++++++++++");
            console.log(req.cookies[key]);
        }
    }

    return lotsCount;
}

exports.deleteCoockie = function(req, res, title) {

    for(key in req.cookies) {
        let cookietext = req.cookies[key];
        if(cookietext == title) {
            res.clearCookie(key);
        }
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

}