import express from 'express'
import { protectedRoutes } from '../middleware/protectedRoutes.js';
import { addProtectedRoutes } from '../middleware/addProtectedRoutes.js';
import { issuedBooksUsers } from '../controllers/issued.controllers.js';

const issuedRoutes = express.Router();

issuedRoutes.use(protectedRoutes)

issuedRoutes.post('/issuedBooks/:id',addProtectedRoutes(["admin","librarian"]),issuedBooksUsers)

export default issuedRoutes