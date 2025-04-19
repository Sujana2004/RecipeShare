import { Request, Response } from 'express';
import Recipe from '../models/Recipe';


export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    if (!title || !description || !category) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const createdBy = req.session.userId;
   

    const newRecipe = new Recipe({
      title:title,
      description:description,
      category:category,
      fileUrl : fileUrl,
      createdBy: createdBy
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Recipe uploaded successfully', recipe: newRecipe });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload recipe', error });
  }
};


export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find().populate('createdBy', 'username email');
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch recipes', error });
  }
};


export const searchRecipesByCategory = async (req: Request, res: Response): Promise<void> => {
  const category = req.query.category as string;

  if (!category) {
    res.status(400).json({ message: 'Category is required' });
    return;
  }

  try {
    const recipes = await Recipe.find({ category });
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Search failed', error });
  }
};
