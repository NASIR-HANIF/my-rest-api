const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.post("/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        } else {
            const user = new userModel({
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType,
            });
            user
                .save()
                .then((result) => {
                    console.log(result);
                    res.status(200).json({
                        newUserCreated: result,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        error: err,
                    });
                });
        }
    });
});

module.exports = router;
