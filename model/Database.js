var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbname = "svstore";

var db;

module.exports = () => {
    MongoClient.connect(url).then((client)=>{
        db = client.db("svstore");
    });
}

module.exports.url = url + dbname;

module.exports.Menager = {
    insertUser(obj) {
        return db.collection('users').insertOne(obj, { w: 1 });
    },

    selectUserWithLogin(login) {
        let query = {login: login};
        return db.collection('users').findOne(query);
    },

    selectNewSalesmanes() {
        let query = {type: "Salesman", isNew: true};
        return db.collection('users').find(query).toArray();
    },

    deleteUser(login) {
        let query = {login: login};
        return db.collection('users').deleteOne(query);
    },

    getCountOfCollection(name){
        return db.collection(name).count();
    },

    selectPageDataFromCollection(name, count, page, elementsPerPage) {
        let skipIndex = count - (page * elementsPerPage);

        if(skipIndex < 0) {
            elementsPerPage += skipIndex;

            console.log("skipIndex: " + skipIndex);
            skipIndex = 0;
        }

        console.log("elementsPerPage" + elementsPerPage);
        return db.collection(name).find().skip(skipIndex).limit(elementsPerPage).toArray();
    },

    updateUserIsNotNew(login) {
        let query  = {login: login};
        let newValue = {$set: {isNew: false}};
        return db.collection('users').updateOne(query, newValue);
    },

    addGoodsToCollection(collectionName, goods) {
        return db.collection(collectionName).insertOne(goods);
    },

    selectLotFromCollection(collectionName, lot) {
        let query = {title: lot};
        return db.collection(collectionName).findOne(query);
    },

    selectBasketList(arr) {
        let promisesTask = [];

        console.log("i am in!!!");

        for(item of arr) {
            let query = {title: item.title};
            console.log(item.title);
            console.log(item.section);
            let task = db.collection(item.section).findOne(query);
            promisesTask.push(task);
        }

        let promise = Promise.all(promisesTask);

        return promise;
    }

}

