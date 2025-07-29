import express from 'express'
import { protectedRoutes } from '../middleware/protectedRoutes.js';
import { addProtectedRoutes } from '../middleware/addProtectedRoutes.js';
import { getAllRequest, requestBook } from '../controllers/request.controllers.js';


const requestRoutes = express.Router();

requestRoutes.use(protectedRoutes)

requestRoutes.post('/requestBook/',addProtectedRoutes(["student","faculty"]),requestBook)
requestRoutes.get('/',addProtectedRoutes(["admin"]),getAllRequest)

export default requestRoutes