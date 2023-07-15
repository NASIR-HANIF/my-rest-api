const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/productModel");
const checkAuth = require("../middleware/check-auth");
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: 'djzkxnrjz',
    api_key: '211569413718814',
    api_secret: 'mOpVBacb_8zEdqnBKZ7eeaGQAZQ'
});



// get all product
router.get("/", (req, res, next) => {
    Product.find().exec().then(result => {
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
    Product.findById(req.params.id).exec().then(result => {
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
//checkAuth,
router.post("/",checkAuth, (req, res, next) => {
    const file = req.files.photo
    cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
        const product = new Product({
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            mrp: req.body.mrp,
            sp: req.body.sp,
            discountPercent: req.body.discountPercent,
            imagePath: result.url
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
    });


})

// update product request put data complete object update
//checkAuth,
router.put("/:id", checkAuth,(req, res, next) => {
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


// delete product request onley use id
//checkAuth,
/*
router.delete("/:id",checkAuth, (req, res, next) => {
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
*/

router.delete("/", checkAuth,(req, res, next) => {
    const imageUrl = req.query.photo;
    const deleteid = req.query.id;

    const imageSplitArray = imageUrl.split("/")
    const imageName = imageSplitArray[imageSplitArray.length - 1]
    const imageAdress = imageName.split(".")[0]
    Product.deleteOne({ _id: deleteid }).then(result => {
        // delet image cloudinery 
        cloudinary.uploader.destroy(imageAdress,(error,result)=>{
            console.log(error,result)
        })
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


module.exports = router;