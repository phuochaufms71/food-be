import express from 'express';
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { createFood, deleteFood, getFoodCategory, getFoodDetail, getFoods, updateFood } from '../controllers/foodController.js';

const router = express.Router();

router.get('/admin-food/lists', auth, getFoods);
router.get('/', auth, getFoodCategory);
router.get('/shopping/:name', auth, getFoodDetail);
router.post('/admin-food/create', auth, authAdmin, createFood);
router.put('/admin-food/lists/:id', auth, authAdmin, updateFood);
router.delete('/admin-food/lists/:id', auth, authAdmin, deleteFood);

export {router as foodRoute};
