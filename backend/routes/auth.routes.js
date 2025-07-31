import express from 'express'
import { forgotPassowrdRequest, getForgotPassword, isMe, login, logout, register, updatePassowrd } from '../controllers/auth.controllers.js';
import { protectedRoutes } from '../middleware/protectedRoutes.js';

const authRoutes = express.Router();


authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.get('/me',protectedRoutes,isMe)
authRoutes.post('/logout',logout)
authRoutes.post('/forgot-password',forgotPassowrdRequest)
authRoutes.post('/forgotPassword/:id/:token',updatePassowrd);
authRoutes.get('/forgotPassword/:id/:token',getForgotPassword);

export default authRoutes