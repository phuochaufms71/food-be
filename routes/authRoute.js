import express from 'express';
import { register, login, changePassword, resetPassword, logout, editUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/change-password', changePassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);
router.put('/edit', editUser);

export {router as authRoute};