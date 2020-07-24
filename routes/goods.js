var db = require('../model/Database');
var findOutSection = require('../utils/findOutSection');

exports.firstPage = function(req, res, next) {

    let name = findOutSection(req.url);

    db.Menager.getCountOfCollection(name).then((count)=> {
    db.Menager.selectPageDataFromCollection(name, count, 1, 9).then((results)=> {

        res.locals.goods = results.reverse();

        let pagesCount = Number.parseInt(count / 9);

        res.render("goods", { url: req.url, pagesCount: pagesCount});
    });
    });
}

exports.nextPage = function (req, res, next) {
    let name = findOutSection(req.url);

    let page = req.params.id;

    let pathArr = req.url.split('/');
    let url = pathArr[0] + '/' + pathArr[1]+ '/' + pathArr[2];

    db.Menager.getCountOfCollection(name).then((count)=> {
        db.Menager.selectPageDataFromCollection(name, count, page, 9).then((results)=> {

            res.locals.goods = results.reverse();

            let pagesCount = Number.parseInt(count / 9);

            res.render("goods", { url: url, pagesCount: pagesCount});
        });
    });
}

