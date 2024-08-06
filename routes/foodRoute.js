import express from 'express';
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { createFood, deleteFood, getFoodDetail, getFoods, updateFood } from '../controllers/foodController.js';
// import upload from "../middleware/multer.js"

const router = express.Router();

router.get('/', auth, getFoods);
router.get('/:id', auth, getFoodDetail);
router.post('/admin-food/create', auth, authAdmin, createFood); //upload.single('image')
router.put('/:id', auth, authAdmin, updateFood);
router.delete('/:id', auth, authAdmin, deleteFood);

export {router as foodRoute};
