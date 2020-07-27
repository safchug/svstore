var db = require('../model/Database');

exports.form = function(req, res) {
    res.render('sampler');
}

exports.addSamplerListToDb = function (req, res) {
    let section = req.body.section;
    let title = req.body.title;
    let price = req.body.price;
    let image = req.body.image;
    let arr = [];
    for(i = 0; i < 100; i++) {
        let obj = {};
        obj.section = section;
        let time = new Date().getTime();
        obj.title = title + "(" + time + ")" + "  " + i;
        obj.price = price;

        let imagesArr = [];
        for(j = 0; j < 10; j++) {
            let str = "/goods/" + image;
            imagesArr.push(str);
        }

        obj.images = imagesArr;

        obj.characteristics = {char1: 'text', char2: 'text2', char3: 'text3', char4: 'text4'};

        arr.push(obj);

    }

    db.Menager.insertSamplersList(section, arr).then((result)=>{
        res.render('info', {message: "List added successfully!!!"})
    });

}