const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    code:String,
    title:String,
    description:String,
    mrp:Number,
    sp:Number,
    discountPercent:Number,
    imagePath : String
})
module.exports = mongoose.model('Product',productSchema);