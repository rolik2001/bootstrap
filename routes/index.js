var express = require('express');
var router = express.Router();
var db = require('orm').db;
var User = db.models.users;
var Balance = db.models.balance;
var _ = require('lodash');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', {
        layout: 'layouts/other'
    });
});
router.post('/login', function(req, res, next) {
    User.find({
        login: req.body.login
    }, function(err, people) {
        if (people == false) {
            res.send('Invalid username or password');
        } else {
            User.find({
                password: req.body.password
            }, function(err, pass) {
                if (pass == false) {
                    res.send('Invalid username or password');
                } else {
                    User.find({
                        login: req.body.login
                    }, function(err, pass) {
                        if (pass = false) {
                          res.send("Problem server")
                        } else {
                            res.render('cabinet', {
                                login: User.login,
                                email: User.email,
                                id: User.id
                            })
                        }
                    });
                }
            });
        }
    });
});
router.post('/sign', function(req, res, next) {
    res.render('sign');
});
router.post('/register', function(req, res, next) {
    if (req.body.login == false || req.body.email == false || req.body.password == false || req.body.password2 == false) {
        res.send("You have not filled the registration form")
    } else {
        if (req.body.password == req.body.password2) {
            var user = _.pick(req.body, 'login', 'password', 'email');
            User.create(user, function(err, item) {
                if (item) {
                    Balance.create({
                        balance: "100",
                        idlogin: User.id
                    }, function(eror, items) {});
                    res.send("You are register")
                } else {
                    res.send("Sorry but register is failed")
                }
            });

        } else {
            res.send("Password is not match")
        }
    }
});


module.exports = router;
