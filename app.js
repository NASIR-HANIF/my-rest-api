const express = require("express");
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://firstfree101:4kBt45HcjOVaFQmd@firstcluster.tinmtjn.mongodb.net/')
mongoose.connection.on('error',error=>{
    console.log("connection failed ..!")
});

mongoose.connection.on('connected',connected=>{
    console.log("connection success")
})

app.use("/student",studentRoute);
app.use("/faculty",facultyRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        error : "page not found"
    })
})

module.exports = app;