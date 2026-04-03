import user from "../models/user.models.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import 'dotenv/config' 

export const loginController = async (req,res,next) =>{
    try{
        const {email,password} = req.body;

        const emailChecker = await user.findOne({email})
        if(!emailChecker){
            return res.status(401).json({message:'User not found'})
        }

        const pass = await bcrypt.compare(password,emailChecker.password)
        if (!pass){
            return res.status(401).json({message:'Password wrong'})
        }

        const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,              
        { expiresIn: "1h" }                 
        );

        res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, 
        });

       // console.log(token);

        res.status(200).json({message:'Login successfull'})
    }
    catch(err){
        return res.status(503).json({message:'Unable to login'})
    }


}