import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:["student","admin","librarian","guest"],
        required:true
    },
})

const authModel = mongoose.model('user',authSchema)

export default authModel