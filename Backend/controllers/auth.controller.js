const signupSchema = require("../zodSchemas/signUpSchema");
const User = require("../models/User");
exports.signup = async ( req, res)=>{
    try{
         signupSchema.parse(req.body);
         const { username, email, password}= req.body;
         const exists = await User.findOne({email});
         if(exists){
             return res.status(400).json({ message: "User already exists" });
         }
         
         const newUser = new User({username, email, password});
         console.log(newUser);
         await newUser.save();
         return res.status(201).json({message: "Signup successful"});


    }    
    catch(err){
         res.status(400).json({ message: err.message });
    }
}