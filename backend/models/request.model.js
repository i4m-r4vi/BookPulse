import mongoose from "mongoose";

const requestBook = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    bookId: {
        type: mongoose.Schema.ObjectId,
        ref: 'book',
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
},{timestamps:true});

const requestBookModel = mongoose.model("requestBook", requestBook);

export default requestBookModel
