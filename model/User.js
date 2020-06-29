var bcrypt = require('bcryptjs');

class User {
    constructor(name, surname, login, type, phone, isLogined) {
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.type = type;
        this.phone = phone;
        this.isLogined = isLogined;
    }

    static createUser(obj) {

        var newUser = new User();
        for(let key in obj)  {
            newUser[key] = obj[key];
        }

        return newUser;
    }

    hashPass(pass, cb){
        bcrypt.genSalt(8,(err, salt) => {
            if (err) throw err;
            this.salt = salt;
            bcrypt.hash(pass, this.salt, (err, hash) => {
               this.hash = hash;
               cb();
            });
        });
    }

    static verifyPass(pass, hash, cb){
        bcrypt.compare(pass, hash, (err, result) => {
            cb(result);
        });
    }
}


module.exports = User;