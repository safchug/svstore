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

    async selectBasketList(arr) {
        let results = [];

        for(item of arr) {
            let query = {title: item.title};
            let lot = await db.collection(item.section).findOne(query);
            results.push(lot);
        }

        return results;
    },

    async selectBasketListOfUser(login) {
        let query = {login: login};
        let arr = await db.collection('basket').find(query).toArray();
        let results = [];

        for(item of arr) {
            let query = {title: item.title};
            let lot = await db.collection(item.section).findOne(query);
            results.push(lot);
        }

        return results;
    },

    getBasketSizeofUser(login) {
        let query = {login: login};

        return db.collection('basket').find(query).count();
    },

    insertBasketItem(item) {
        return db.collection('basket').insertOne(item);
    },

    async insertBasketListForUser(login, lotsFromCookies) {
        let query = {login: login};
        let addedLots = await db.collection('basket').find(query).toArray();

        let selectedLots = [];
        let i, j;
        let addedLotLength = addedLots.length;
        let lotsFromCookiesLength = lotsFromCookies.length;

        if (addedLotLength != 0) {
            for (i = 0; i < lotsFromCookiesLength; i++) {
                let isAdded = false;
                for (j = 0; j < addedLotLength; j++) {
                    if (lotsFromCookies[i] == addedLots[j]) {
                        isAdded = true;
                    }
                }
                if(!isAdded) {
                    let obj = lotsFromCookies[i];
                    obj.login = login;
                    selectedLots.push(obj);
                }
            }
        }

        let result = (selectedLots.length > 0 )?
            db.collection('basket').insertMany(selectedLots)
            : 0;

        return result;
    },

    deleteBasketItem(login, title) {
        let query = {login: login, title: title};

        return db.collection('basket').deleteOne(query);
    }
}

