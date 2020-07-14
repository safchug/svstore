var db = require('../model/Database');
var findOutSection = require('../utils/findOutSection');


exports.from = function(req, res, next) {
    let lot  = req.params.id;
    let collectionName = findOutSection(req.url)

    db.Menager.selectLotFromCollection(collectionName, lot).then((lot)=> {
        res.locals.lot = lot;
        res.render('viewlot');
    });

}