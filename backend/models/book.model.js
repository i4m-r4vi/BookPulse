import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    bookImgUrl:{
        title:String,   
    },
    decription:{
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
})

const bookModel = mongoose.model('book',bookSchema)

export default bookModel