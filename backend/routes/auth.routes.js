import express from 'express'
import { isMe, login, logout, register } from '../controllers/auth.controllers.js';
import { protectedRoutes } from '../middleware/protectedRoutes.js';

const authRoutes = express.Router();

authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.get('/me',protectedRoutes,isMe)
authRoutes.post('/logout',logout)

export default authRoutes