import jwt from 'jsonwebtoken'
import 'dotenv/config' 

export const authMiddlewares = async (req,res,next)=>{
    try{
        const cookieToken = req.cookies?.token;

        const headerToken = req.headers.authorization?.split(" ")[1];

        const token = cookieToken || headerToken

        if (!token){
            return res.status(401).json({message:'Token not found'})
        }

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verifyToken;
        next();
    }

    catch(err){
        return res.status(503).json({message:'Error while token verifying'})
    }
}