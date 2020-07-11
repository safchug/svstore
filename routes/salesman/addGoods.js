var async = require('async');
var db = require('../../model/Database');

exports.form = function(req, res, next) {
    let user = req.session.user || null;
    if(user && user.type == "Salesman") {
        res.render("addgoods");
    }
}

function figrureOutFileFormat(file, index) {
    let realName = file.name;
    let format = realName.slice(realName.indexOf("."), realName.length);
    console.log("format: " + format);
    format = "_" + index + format;
    return format;
}

exports.upload = function(req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let fileName = req.body.title;
    fileName = fileName.slice(0, 5);
    fileName.replace(" ", "_");
    fileName += new Date().getTime();
    let index = 0;

    async.each(req.files.filesUploaded,(file, callback)=> {

        let format = figrureOutFileFormat(file, index);
        index++;

        file.mv('./public/goods/'+ fileName + format, function (err) {
            if (err) console.log(err.message);
            callback();
        });
        }, function (err, result) {
            if (err) {
                res.render('error', {message: err.message});
            } else {
                let goods = req.body;
                let images = req.files.filesUploaded;
                let arr = [];

                let i;
                for(i = 0; i < images.length; i++) {
                    let format = figrureOutFileFormat(images[i], i);
                    arr[i] = '/goods/' + fileName + format;
                }

                goods.images = arr;

                db.Menager.addGoodsToCollection(req.body.section, goods).then((result)=>{
                    res.render('addgoods');
                });
            }
        });

}

