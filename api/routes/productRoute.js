const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/productModel");

// get all product
router.get("/", (req, res, next) => {
    Product.find().then(result => {
        console.log(result);
        res.status(200).json({
            allProductData: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

// get single product request
router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id).then(result => {
        console.log(result);
        res.status(200).json({
            singleProduct: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

// creat new product post student request
router.post("/", (req, res, next) => {
    const product = new Product({
        code: req.body.code,
        title: req.body.title,
        description: req.body.description,
        mrp: req.body.mrp,
        sp: req.body.sp,
        discountPercent: req.body.discountPercent,
        imagePath: req.body.imagePath
    })
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            newProductCreated: result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

})

// delete product request
router.delete("/:id", (req, res, next) => {
    Product.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            singleProductDelete: result
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

// update product request put data complete object update
router.put("/:id", (req, res, next) => {
    Product.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            mrp: req.body.mrp,
            sp: req.body.sp,
            discountPercent: req.body.discountPercent,
            imagePath: req.body.imagePath
        }
    }).then(result => {
        console.log(result);
        res.status(200).json({
            productUpdated: result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

})
module.exports = router;