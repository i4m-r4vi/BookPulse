import bookModel from "../models/book.model.js";
import requestBookModel from "../models/request.model.js";

export const requestBook = async(req,res)=>{
    try {
        const {id} = req.body;
        const user = req.user._id
        const findBook = await bookModel.findById(id);
        if(!findBook){
            return res.status(400).json({error:"Book is Unavailable"})
        }
        const alreadyRequest = await requestBookModel.findOne({
            userId:user,
            bookId:id
        })
        if(alreadyRequest){
            return res.status(400).json({message:"Already Request has been Sent"})
        }
        const createRequest = await requestBookModel.create({
            userId:user,
            bookId:id
        })
        await createRequest.save();
        res.status(200).json({message:"Request Successfully Sended"})
    } catch (error) {
        console.log(`Error in requestBook : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getAllRequest = async(req,res)=>{
    try {
        const findRequest = await requestBookModel.find().sort({'createdAt':-1}) 
        if(!findRequest){
            return res.status(404).json({error:"No Request Found"})
        }
        res.status(200).json({request:findRequest})
    } catch (error) {
        console.log(`Error in getAllRequest : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}