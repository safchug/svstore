var url = require('url');

module.exports = function (path) {
    let pathname = url.parse(path).pathname;
    let section = "";

    if(pathname.indexOf("/pc") != -1) {
        section = "PC";
    } else if(pathname.indexOf("/leptops") != -1) {
        section = "Leptops";
    } else if(pathname.indexOf("/cellphones") != -1) {
        section = "Cellphones";
    } else if(pathname.indexOf("/headphones") != -1) {
        section = "Headphones";
    } else if(pathname.indexOf("/tv") != -1) {
        section = "Tv";
    } else if(pathname.indexOf("/routers") != -1) {
        section = "Routers";
    } else if(pathname.indexOf("/other") != -1) {
        section = "Other";
    }

    return section;
}