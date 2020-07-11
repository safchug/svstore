var db = require('../model/Database');
var url = require('url');

exports.firstPage = function(req, res, next) {
    let pathname = url.parse(req.url).pathname;
    console.log("section: " + pathname);
    let name = figureOutWhatSectionUsed(pathname);
    db.Menager.getCountOfCollection(name).then((count)=> {
    db.Menager.selectPageDataFromCollection(name, 0).then((results)=> {
        console.log("results.length ===============  " + results.length);


        res.locals.goods = results.reverse();

        console.log(res.locals.goods);

        res.render("goods");
    });
    });
}

exports.nextPage = function (req, res, next) {
    let section = url.parse(req.url);
    console.log("section: " + section.pathname);
    let line = "id = " + req.params.id;
    res.end(line);
}

function figureOutWhatSectionUsed(pathname) {
    let section = "";

    if(pathname.indexOf("/pc") != -1) {
        section = "PC";
    } else if(pathname.indexOf("/leptops") != -1) {
        section = "leptops";
    } else if(pathname.indexOf("/cellphones") != -1) {
        section = "cellphones";
    } else if(pathname.indexOf("/headphones") != -1) {
        section = "headphones";
    } else if(pathname.indexOf("/tv") != -1) {
        section = "tv";
    } else if(pathname.indexOf("/routers") != -1) {
        section = "routers";
    } else if(pathname.indexOf("/other") != -1) {
        section = "other";
    }

    return section;
}