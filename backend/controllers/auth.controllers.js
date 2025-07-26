import bcrypt from 'bcrypt'
import authModel from '../models/auth.models.js';

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