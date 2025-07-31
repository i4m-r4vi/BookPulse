import express from 'express'
import { forgotPassowrdRequest, getAllUsers, getForgotPassword, isMe, login, logout, register, updatePassowrd, updateUser } from '../controllers/auth.controllers.js';
import { protectedRoutes } from '../middleware/protectedRoutes.js';
import { addProtectedRoutes } from '../middleware/addProtectedRoutes.js';

const authRoutes = express.Router();


authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.get('/me',protectedRoutes,isMe)
authRoutes.post('/logout',logout)
authRoutes.post('/forgot-password',forgotPassowrdRequest)
authRoutes.post('/forgotPassword/:id/:token',updatePassowrd);
authRoutes.get('/forgotPassword/:id/:token',getForgotPassword);
authRoutes.get('/getAllUsers',protectedRoutes,addProtectedRoutes(["admin"]),getAllUsers)
authRoutes.put('/updateUser/:userId',protectedRoutes,addProtectedRoutes(["admin"]),updateUser)

export default authRoutes