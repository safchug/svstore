var db = require('../model/Database');
var cookiesManipulation = require('../utils/cookiesManipulation');

exports.form = function(req, res) {
    let user = res.locals.user;

    if(user.isLogined) {
        db.Menager.selectBasketListOfUser(user.login).then((list)=> {
            res.render('order', {orderList: list});
        });
    } else {
        let arr = cookiesManipulation.getItemsList(req);

        db.Menager.selectBasketList(arr).then((list)=> {
            res.render('order', {orderList: list});
        });
    }

}

exports.makeOrder = function (req, res) {

    let order = createOrder(req);

    db.Menager.insertOrder(order).then((result) => {
        clearBasket(req, res).then((result2)=> {
            res.render('info', { basketSize: 0,
                message: 'Thank you for your order. Our Salasman will contact you soon!'});
        });
    });

}

function createOrder(req) {

    let order = {};

    let arr = req.body.order.list;
    let list = JSON.parse(arr);

    let user = req.session.user || null;

    if(user) {
        order.login = user.login;
    }

    order.name = req.body.name;
    order.goods = list;
    order.totalPrice = req.body.total_price;
    order.payment = req.body.payment;

    if(order.payment == 'card') {
        order.card = {serial: req.body.serial,
            expireMonth: req.body.expire_month,
            expireYear: req.body.expire_year,
            cvv: req.body.cvv
        }
    }

    order.region = req.body.region;
    order.district = req.body.region;
    order.city = req.body.city;
    order.zipCode = req.body.zip_code;

    return order;
}

async function  clearBasket(req, res) {
    let user = req.session.user || null;

    if(user) {
        return  db.Menager.deleteUserBasketDocs(user.login);
    } else {
        cookiesManipulation.clearCookies(req, res);
        return "ok";
    }
}