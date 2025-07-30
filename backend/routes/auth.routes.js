import express from 'express'
import { forgotPassowrdRequest, getForgotPassword, isMe, login, logout, register, updatePassowrd } from '../controllers/auth.controllers.js';
import { protectedRoutes } from '../middleware/protectedRoutes.js';

const authRoutes = express.Router();
/**
 * @swagger
 * paths:
 *   /auth/register:
 *     post:
 *       summary: Register a new user
 *       tags:
 *         - Users
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [student, faculty, librarian, admin]
 *       responses:
 *         '201':
 *           description: User registered successfully
 */




authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.get('/me',protectedRoutes,isMe)
authRoutes.post('/logout',logout)
authRoutes.post('/forgot-password',forgotPassowrdRequest)
authRoutes.post('/forgotPassword/:id/:token',updatePassowrd);
authRoutes.get('/forgotPassword/:id/:token',getForgotPassword);

export default authRoutes