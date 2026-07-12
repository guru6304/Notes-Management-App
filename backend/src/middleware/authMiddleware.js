const jwt= require("jsonwebtoken");

const authticateUser = (req,res,next)=>{
    try{
        const authHeader= req.headers.authorization;
        if(!authHeader||!authHeader.startsWith("Bearer ")){
            const error = new Error("Access Denied .Token Missing");
            error.statusCode = 401;
            return next(error);
        }
        const token=authHeader.split(" ")[1];
        if(!token){
            const error = new Error("Invalid Token");
            error.statusCode = 401;
            return next(error);
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    }catch(err){
        err.statusCode=401;
        next(err);
    }
};
module.exports = authticateUser;