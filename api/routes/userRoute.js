const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
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

// login post request
router.post("/login", (req, res) => {
    userModel.find({ email: req.body.email })
        .then(userData => {
            if (userData.length < 1) {
                return res.status(401).json({
                    msg: "user not exist"
                })
            }
            bcrypt.compare(req.body.password, userData[0].password, (err, result) => {
               
                if (!result) {
                    return res.status(401).json({
                        msg: "password matching fail"
                    })
               }
                if (result) {
                    const token = jwt.sign({
                        username: userData[0].username,
                        phone: userData[0].phone,
                        email: userData[0].email,
                        userType: userData[0].userType
                    }, 'i am secret', { expiresIn: "24h" });
                      //expire hour or Date
                      res.status(200).json({
                        username: userData[0].username,
                        phone: userData[0].phone,
                        email: userData[0].email,
                        userType: userData[0].userType,
                        tokrn : token
                      })
                }
            })
        }).catch(err=>{
            res.status(500).json({
              err : err
            })
        })
})

module.exports = router;
