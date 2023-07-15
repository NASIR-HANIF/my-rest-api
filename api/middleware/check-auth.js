const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{


try {
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token,'i am secret');
    if(verify){
        next()
    }else{
        return res.status(401).json({
            msg : "not admin"
        }) 
    }
    
} catch (error) {
    return res.status(401).json({
        msg : "invalid Token"
    })
}

    
}
