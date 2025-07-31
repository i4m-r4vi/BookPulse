import express from 'express'
import { protectedRoutes } from '../middleware/protectedRoutes.js';
import { addProtectedRoutes } from '../middleware/addProtectedRoutes.js';
import { getAllIssuedBook, issuedBooksUsers, returnIssueBook } from '../controllers/issued.controllers.js';

const issuedRoutes = express.Router();

issuedRoutes.use(protectedRoutes)

issuedRoutes.post('/issuedBook/:id',addProtectedRoutes(["admin","librarian"]),issuedBooksUsers)
issuedRoutes.put("/returnBook/:id", addProtectedRoutes(["student", "faculty","admin"]), returnIssueBook);
issuedRoutes.get("/issuedBook/", addProtectedRoutes(["admin"]), getAllIssuedBook);
export default issuedRoutes