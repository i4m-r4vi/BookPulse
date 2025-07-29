import express from 'express'
import { AddBook, deleteBook, getAllBooks, getBooksId, updateBook } from '../controllers/book.controllers.js';
import { addProtectedRoutes } from '../middleware/addProtectedRoutes.js';
import { protectedRoutes } from '../middleware/protectedRoutes.js';


const bookRoutes = express.Router();

/**
 * @swagger
 * /book/:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 * /book/6887a6204e85ad2bbb4f2e03:
 *   get:
 *     summary: Get books Specific Id 
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */

bookRoutes.get('/',getAllBooks)
bookRoutes.get('/:id',getBooksId)
bookRoutes.post("/addBook",protectedRoutes,addProtectedRoutes(["admin","librarian"]),AddBook)
bookRoutes.put("/updateBook/:id",protectedRoutes, addProtectedRoutes(["admin", "librarian"]), updateBook);
bookRoutes.delete("/deleteBook/:id",protectedRoutes,addProtectedRoutes(["admin"]), deleteBook);



export default bookRoutes