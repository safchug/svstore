exports.add = function(req, res, next) {
    let lotsCount = 0;
    let lot = req.params.id;

    for(key in req.cookies) {
        if(key.indexOf('store_lot_') != -1) {
            lotsCount++;
            console.log(req.cookies[key]);
        }
    }

    if(lotsCount == 0) {
        res.cookie("store_lot_1", lot, { maxAge: 1000 * 60 * 60 * 24 * 7 * 2, httpOnly: true });
    } else {
        let cookieName = "store_lot_" + lotsCount + 1;
        res.cookie(cookieName, lot, { maxAge: 1000 * 60 * 60 * 24 * 7 * 2, httpOnly: true });
    }
}