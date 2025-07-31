import bookModel from "../models/book.model.js";
import issuedBooksModel from "../models/issued.model.js";
import requestBookModel from "../models/request.model.js";

export const issuedBooksUsers = async (req, res) => {
    try {
        const todayDate = new Date();
        const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const { id } = req.params; 
        const { userId } = req.body; 
        const findBook = await bookModel.findById(id);
        if (!findBook) {
            return res.status(400).json({ error: "Unable to find book" });
        }
        if (findBook.availableCopies <= 0) {
            return res.status(400).json({ error: "The book is not available in stock" });
        }
        const requestBook = await requestBookModel.findOne({
            bookId:id,
            userId:userId,
            status: "pending" 
        });
        if (requestBook) {
            requestBook.status = "approved";
            await requestBook.save();
        }
        const alreadyIssued = await issuedBooksModel.findOne({
            UserId: userId,
            bookId: id,
            returned: false
        });

        if (alreadyIssued) {
            return res.status(400).json({ message: "The book has already been issue to the user" });
        }

        findBook.availableCopies -= 1;
        await findBook.save();

        const issuedBook = await issuedBooksModel.create({
            UserId: userId,
            bookId: id,
            issuedDate: todayDate,
            dueDate,
            returned: false
        });
        res.status(200).json({ message: "Book issued successfully", issuedBook });
    } catch (error) {
        console.error(`Error in issuedBooksUsers: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const returnIssueBook = async (req, res) => {
  try {
    const { id } = req.params;

    const issuedBook = await issuedBooksModel.findById(id);
    if (!issuedBook) {
      return res.status(404).json({ error: "Issued record not found" });
    }

    if (issuedBook.returned === true) {
      return res.status(400).json({ message: "Book already returned" });
    }

    issuedBook.returned = true;
    issuedBook.returnDate = new Date();
    await issuedBook.save();


    const findBook = await bookModel.findById(issuedBook.bookId);
    if (findBook) {
      findBook.availableCopies += 1;
      await findBook.save();
    }
    res.status(200).json({ message: "Book returned successfully", issuedBook });
  } catch (error) {
    console.error("Error in returnIssuedBook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllIssuedBook = async(req,res)=>{
  const getAllIssuedBook = await issuedBooksModel.find().populate({path:"UserId",select:["-password","-__v"]}) .populate({path:"bookId",select:["-bookImgUrl","-totalCopies","-availableCopies","-createdAt","-updatedAt","-__v"]})
  res.status(200).json({ message: getAllIssuedBook });

}
