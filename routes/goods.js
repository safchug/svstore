var db = require('../model/Database');
var findOutSection = require('../utils/findOutSection');

exports.firstPage = function(req, res, next) {

    let name = findOutSection(req.url);
    console.log("findOutSection(req.url)" + name);

    db.Menager.getCountOfCollection(name).then((count)=> {
    db.Menager.selectPageDataFromCollection(name, count, 1, 8).then((results)=> {
        console.log("results.length ===============  " + results.length);

        res.locals.goods = results.reverse();

        res.render("goods", { url: req.url});
    });
    });
}

exports.nextPage = function (req, res, next) {
    let name = findOutSection(req.url);

    let line = "id = " + req.params.id;
    res.end(line);
}

