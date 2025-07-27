import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export const generateToken = async(id,res)=>{
    try {
        const token = jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:'15d'
        })
        res.cookie('bookpulse',token,{
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,    // Can't access via JavaScript
            sameSite: 'None',  // Allow across sites 
            secure: true  
        })
    } catch (error) {
        console.log(`Error in generateToken : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}