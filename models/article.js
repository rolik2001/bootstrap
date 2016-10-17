// Example model
var db = require('orm').db;

var users = db.define('users', {
    id: String,
    login: String,
    password: String,
    email: String
}, {
    methods: {
        example: function() {
            // return example;
        }
    }
});
var balance = db.define('balance', {
    balance: String,
    idlogin: String
}, {
    methods: {
        example: function() {
            // return example;
        }
    }
});
