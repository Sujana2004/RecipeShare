import { Router } from 'express';
import upload from '../middleware/upload';
import { createRecipe, getAllRecipes, searchRecipesByCategory } from '../controllers/recipeController';

const router = Router();

router.post('/upload', upload.single('file'), createRecipe);
router.get('/all', getAllRecipes);
router.get('/search', searchRecipesByCategory);

export default router;
