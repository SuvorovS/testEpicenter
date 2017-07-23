const crypto = require('crypto');
const defaultFoodStorage = require('./defaultFoodStorage');


var mongoose = require('../mongoose');
Schema = mongoose.Schema;
var schema = new Schema({
    userName : {
        type : String,
        unique : true,
        required : true
    },
    hashedPassword : {
        type : String,
        required : true
    },
    salt : {
        type : String,
        required : true
    },
    created : {
        type : Date,
        default : Date.now
    },
    bodyData : {
        type : Object,
        default: {
            height : 180,
            weight : 80,
            maxKall : 2000,
        },
    },
    foodStorage : {
        type : Object,
        required : true,
        default : defaultFoodStorage
    }
 
});
schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this._plainPassword; });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

exports.User = mongoose.model('User', schema)