import express from 'express'
import { AddBook, deleteBook, getAllBooks, getBooksId, updateBook } from '../controllers/book.controllers.js';
import { addProtectedRoutes } from '../middleware/addProtectedRoutes.js';
import { protectedRoutes } from '../middleware/protectedRoutes.js';


const bookRoutes = express.Router();

bookRoutes.get('/',getAllBooks)
bookRoutes.get('/:id',getBooksId)
bookRoutes.post("/addBook",protectedRoutes,addProtectedRoutes(["admin","librarian"]),AddBook)
bookRoutes.put("/updateBook/:id",protectedRoutes, addProtectedRoutes(["admin", "librarian"]), updateBook);
bookRoutes.delete("/deleteBook/:id",protectedRoutes,addProtectedRoutes(["admin"]), deleteBook);



export default bookRoutes