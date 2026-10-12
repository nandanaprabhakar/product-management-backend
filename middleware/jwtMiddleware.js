const jwt = require('jsonwebtoken');

const jwtMiddleware = (req,res,next) =>{
    console.log('Inside jwt middleware');
    console.log(req.headers.authorization.slice(7));
    try{
        const token = req.headers.authorization.slice(7);
        const jwtVerification = jwt.verify(token, process.env.jwtKey);
        console.log(jwtVerification);
        req.payload = jwtVerification.email;
    }
    catch(err){
        res.status(500).json("Authorization Error", err);
    }
    next();
}

module.exports = jwtMiddleware;