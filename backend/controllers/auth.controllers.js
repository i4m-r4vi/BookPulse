import bcrypt from 'bcrypt'
import authModel from '../models/auth.models.js';
import { generateToken } from '../utils/GenerateToken.js';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

dotenv.config();

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

export const forgotPassowrdRequest = async(req, res) => {
    try {
        const { email } = req.body;
        const user = await authModel.findOne({ email }).select('-password');
        const secret = user._id + process.env.jwtsecret;
        const token = jwt.sign({ id: user._id, email: user.email }, secret, {
            expiresIn: '10m'
        })
        // `${process.env.BACKENDURL}/${user._id}/${token}/`||
        const resetUrl =`${process.env.BACKENDURL}/${user._id}/${token}/`
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.PASS}`
            }
        })
        const msgOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset Request',
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Hello ${user.name || 'User'},</p>
      <p>You are receiving this email because you (or someone else) requested a password reset for your account.</p>
      <p>Please click the button below to reset your password. This link will expire in 10 minutes.</p>
      <p style="text-align: center;">
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      </p>
      <p>If the button doesn't work, copy and paste this URL into your browser:</p>
      <p style="word-break: break-all;"><a href="${resetUrl}">${resetUrl}</a></p>
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #888;">If you did not request this, please ignore this email. Your password will remain unchanged.</p>
    </div>
  `     };
        await transporter.sendMail(msgOptions, (err, info) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).json({ message: `Password reset link sent` });
            transporter.close();
        })
    } catch (error) {
        console.error("Error occurred during forgotPasswordRequest:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const updatePassowrd = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { newPassword } = req.body;
        const user = await authModel.findOne({ _id: id })
        const secret = user._id + process.env.jwtsecret;
        try {
            jwt.verify(token, secret)
        } catch (error) {
            return res.status(404).json({ message: "Invalid Token" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save()
        res.status(200).json({ message: "Password Successfully Changed" })
    } catch (error) {
        console.error("Error occurred during ForgotPasswordRequest:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const getForgotPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const user = await authModel.findOne({ _id: id })
        const secret = user._id + process.env.jwtsecret;
        try {
            jwt.verify(token, secret)
        } catch (error) {
            return res.status(404).json({ message: "Invalid Token" })
        }
        res.render('forgot-password.ejs')
    } catch (error) {
        console.error("Error occurred during getForgotPassword:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}