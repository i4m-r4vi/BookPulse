import bcrypt from 'bcrypt'
import authModel from '../models/auth.models.js';
import { generateToken } from '../utils/GenerateToken.js';

export const register = async (req,res) => {
    try {
        const { name, email, password, role } = req.body;
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!(emailReg.test(email))){
            return res.status(400).json({error:"Invalid email"})
        }
        if (!name || !email || !password || !role){
            return res.status(400).json({error:"Please provide all required details."})
        }
        const hashPassword = await bcrypt.hash(password,10);
        const assignedRoles = ["student","admin","librarian","faculty"]
        if(!(assignedRoles.includes(role))){
            return res.status(400).json({error:"Role must be a student,librarian,faculty"})
        }
        const authRegister = await authModel.create({name,email,password:hashPassword,role})
        await authRegister.save()
        res.status(200).json({message:"User Created"})
    } catch (error) {
        console.log(`Error in register : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please enter email and password"})
        }
        const findUser = await authModel.findOne({email});
        const isCorrectPassword = await bcrypt.compare(password,findUser.password);
        if(!findUser || !isCorrectPassword){
            return res.status(400).json({error:"Invalid email or password"})
        }
        await generateToken(findUser._id,res);
        res.status(200).json({message:"Successfully Login"})
    } catch (error) {
        console.log(`Error in login : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const isMe = async(req,res)=>{
    try {
        res.status(200).json({message:`Hi this is ${req.user.name}`})
    } catch (error) {
        console.log(`Error in isMe : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = async(req,res)=>{
    try {
        res.status(200).clearCookie("bookpulse",{
            expiresIn:"0d"
        }).json({message:"Successfully Logout"})
    } catch (error) {
        console.log(`Error in logout : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}