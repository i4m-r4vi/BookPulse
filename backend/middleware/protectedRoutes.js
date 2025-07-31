import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authModel from '../models/auth.models.js';

dotenv.config()

export const protectedRoutes = async(req,res,next)=>{
    try {
        const token = req.cookies.bookpulse;
        
        if(!token){
            return res.status(400).json({error:"Not Authorized"})
        }
        const isToken = await jwt.verify(token,process.env.JWT_SECRET);
        const user = await authModel.findOne({_id:isToken.id}).select("-password")
        req.user = user;
        next()
    } catch (error) {
        console.log(`Error in protectedRoutes : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}