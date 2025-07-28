import bookModel from "../models/book.model.js";
import issuedBooksModel from "../models/issued.model.js";

export const issuedBooksUsers = async(req,res)=>{
    try {
        const todayDate = new Date();
        const dueDate = new Date(Date.now() + 7*24*60*60*1000)
        const {id} = req.params;
        const user = req.user._id;
        
        const findBook = await bookModel.findById(id);
        
        if(!findBook){
            return res.status(400).json({error:"Unable to find Books"})
        }
        if(findBook.availableCopies<=0){
            return res.status(400).json({error:"The Book is not available in stock"})
        }
        findBook.availableCopies-=1
        const issuedBooks = await issuedBooksModel.create(
            {
                UserId:user,
                bookId:id,
                issuedDate:todayDate,
                dueDate,
            }
        )
        await findBook.save()
        await issuedBooks.save()
        res.status(200).json({message:"Successfully Issued"})
    } catch (error) {
        console.log(`Error in issuedBookUsers : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}