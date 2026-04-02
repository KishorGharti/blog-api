import user from "../models/user.models.js";
import validator from "validator";
import bcrypt from 'bcrypt';

export const registerUser = async (req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        //console.log(req.body);
        if (!validator.isEmail(email)){
            return res.status(400).json({message:'Invalid Email'})
        }

        const existingEmail = await user.findOne({email});
        if (existingEmail){
             return res.status(400).json({message:'Already Exist'})
            }
       

        const hashedPassword = await bcrypt.hash(password,10)

        
        const User = await user.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(200).json({message:'register successfull'})
    
    }
    catch(err){
        return res.status(503).json({message:'Error while register'})
    }
}
