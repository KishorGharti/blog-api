import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async (req,res,next)=>{
    try{
            mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected!'));}
        catch(err){
            return res.status(503).json({message:'Server error'})
        }
}
