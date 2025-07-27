import bookModel from "../models/book.model.js";
import cloudinary from 'cloudinary'

export const AddBook = async (req, res) => {
    try {
        const { title, bookImgUrl, description, author, totalCopies, availableCopies } = req.body;

        let bookImg = ''
        if (bookImgUrl) {
            const result = await cloudinary.uploader.upload(bookImgUrl);
            bookImg = result.secure_url;
        }
        const bookAdd = await bookModel.create({ title, description, bookImgUrl: bookImg, author, totalCopies, availableCopies })
        await bookAdd.save()
        res.status(200).json({ message: "Added Book Successfully" })
    } catch (error) {
        console.log(`Error in addBook : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const getBooks = await bookModel.find().sort({ createdAt: -1 })
        if (!getBooks) {
            return res.status(400).json({ error: "No Books Found" })
        }
        res.status(200).json({ books: getBooks })
    } catch (error) {
        console.log(`Error in getAllBooks : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getBooksId = async (req, res) => {
    try {
        const { id } = req.params
        const getBook = await bookModel.findById(id)
        if (!getBook) {
            return res.status(400).json({ error: "Cannot find Book" })
        }
        res.status(200).json({ message: getBook })
    } catch (error) {
        console.log(`Error in getBooksId : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, bookImgUrl, author, totalCopies, availableCopies } = req.body;
        const findBook = await bookModel.findById(id);
        if (!findBook) {
            return res.status(400).json({ error: "Book not found" })
        }
        let Updatedimage = "" || findBook.bookImgUrl
        if (bookImgUrl) {
            const imageUrl = await findBook.bookImgUrl.toString().split('/').pop().split('.')[0]
            const result = await cloudinary.uploader.destroy(imageUrl)
            if (result.result == "ok") {
                const imageUpdate = await cloudinary.uploader.upload(bookImgUrl);
                Updatedimage = imageUpdate.secure_url
            }
        }
        await bookModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    title,
                    description,
                    bookImgUrl: Updatedimage,
                    author,
                    totalCopies,
                    availableCopies,
                },
            },
            { new: true, omitUndefined: true }
        );
        res.status(200).json({ message: "Successfully Updated" })

    } catch (error) {
        console.log(`Error in updateBook : ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const findBook = await bookModel.findById(id);
        if (!findBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        if(findBook.bookImgUrl){
            const imageName = await findBook.bookImgUrl.toString().split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(imageName)
        }
        await bookModel.findByIdAndDelete(id)
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting book" });
    }
};