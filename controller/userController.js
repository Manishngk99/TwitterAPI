const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

var dbConfig = require('../dbConfig/dbConfig');


function hashGen(req, res, next) {
    saltRounds = 10;
    console.log('in has gen');
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            console.log(hash);
            req.userHash = hash;
            next();
        })
        .catch(function (err) {
            next('has gen error')
        })

}
function registerUser(req, res, next) {
    User.create({
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        password: req.userHash,
        profilePicture: req.body.profilePicture
    }).then((user) => {
        let token = jwt.sign({_id:user._id}, process.env.SECRET);
        res.json({ status: "signup successfull", token: token});
    }).catch(next);
};

function login(req, res, next) {
    console.log(req.body)
    User.findOne({ fullName: req.body.fullName })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
}


module.exports = {
    hashGen,
    registerUser,
    login
}