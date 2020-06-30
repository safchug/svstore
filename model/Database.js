var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var db;

module.exports = () => {
    MongoClient.connect(url).then((client)=>{
        db = client.db("svstore");
    });
}

module.exports.url = url + "svstore";

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
    }

}

