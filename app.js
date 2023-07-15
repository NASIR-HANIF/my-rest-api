const express = require("express");
const productRoute = require("./api/routes/productRoute");
const userRoute = require("./api/routes/userRoute");
const bodyParser = require("body-parser")
const app = express();
const mongoose = require("mongoose");
const fileUplode = require("express-fileupload")
mongoose.connect('mongodb+srv://iamnasir:crT56w0x4Q3XuhNH@nasirfirstcluster.l3hsvl6.mongodb.net/')
mongoose.connection.on('error',error=>{
    console.log("connection failed ..!")
});

mongoose.connection.on('connected',connected=>{
    console.log("connection success")
})

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(fileUplode({
    useTempFiles : true
}));
app.use("/product",productRoute);
app.use("/user",userRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        error : "page not found"
    })
})

module.exports = app;