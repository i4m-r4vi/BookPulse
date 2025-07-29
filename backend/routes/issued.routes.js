import express from 'express'
import { protectedRoutes } from '../middleware/protectedRoutes.js';
import { addProtectedRoutes } from '../middleware/addProtectedRoutes.js';
import { issuedBooksUsers, returnIssueBook } from '../controllers/issued.controllers.js';

const issuedRoutes = express.Router();

issuedRoutes.use(protectedRoutes)

issuedRoutes.post('/issuedBook/:id',addProtectedRoutes(["admin","librarian"]),issuedBooksUsers)
issuedRoutes.put("/returnBook/:id", addProtectedRoutes(["student", "faculty","admin"]), returnIssueBook);

export default issuedRoutes