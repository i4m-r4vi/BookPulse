import mongoose from "mongoose";

const issuedBooks = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    bookId:{
        type:mongoose.Schema.ObjectId,
        ref:'book',
        required:true
    },
    issuedDate:{
        type:Date,
        default:Date.now,
        required:true, 
    },
    dueDate:{
        type:Date,
        required:true
    },
    returnedDate:{
        type:Date
    }
})

const issuedBooksModel = mongoose.model('issuedBooks',issuedBooks)

export default issuedBooksModel