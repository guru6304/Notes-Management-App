const pool = require("../config/db");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const [existingUser]=await pool.query("SELECT * FROM users where email=?",[email]);
        if(existingUser.length>0){
            const error = new Error("Email ALready Taken");
            error.statusCode=409;
            return next(error);
        }
        const hashedPassword =await bcrypt.hash(password,10);
        await pool.query("INSERT INTO users (name,email,password) VALUES(?,?,?)",[name,email,hashedPassword]);
        res.status(201).json({
            success:true,
            message:"User Registered Successful"
        });
    }
    catch(err){
        next(err);
    }
};
const loginController = async (req,res,next)=>{
try{
    const{email,password}= req.body;
    const [users]= await pool.query("SELECT * FROM users WHERE email=?",[email]);
    if(users.length===0){
        const error = new Error("Invalid email or password");
        error.statusCode=401;
        return next(error);
    }
    const user = users[0];
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        const error = new Error("Invalid Email id Or Password");
        error.statusCode= 401;
        return next(error);
    }
    const token = jwt.sign(
     {id: user.id},
     process.env.JWT_SECRET,
     {expiresIn:"1d"}   
    );
    res.status(200).json({
        success:true,
        message:"Login Successful",
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        }
    })
}
catch(err){
    next(err);
}
};
module.exports= {registerController,loginController};