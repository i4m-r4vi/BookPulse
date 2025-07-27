import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    bookImgUrl:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    totalCopies:{
        type:Number,
        required:true
    },
    availableCopies:{
        type:Number,
        required:true
    }
},{timestamps:true})

const bookModel = mongoose.model('book',bookSchema)

export default bookModel