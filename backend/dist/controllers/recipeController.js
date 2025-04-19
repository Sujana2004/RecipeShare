"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRecipesByCategory = exports.getAllRecipes = exports.createRecipe = void 0;
const Recipe_1 = __importDefault(require("../models/Recipe"));
// Create recipe
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const newRecipe = new Recipe_1.default({
            title,
            description,
            category,
            fileUrl,
            createdBy: req.session.userId,
        });
        yield newRecipe.save();
        res.status(201).json({ message: 'Recipe uploaded successfully', recipe: newRecipe });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload recipe', error });
    }
});
exports.createRecipe = createRecipe;
// Get all recipes
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield Recipe_1.default.find().populate('createdBy', 'username email');
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch recipes', error });
    }
});
exports.getAllRecipes = getAllRecipes;
// Search recipes by category
const searchRecipesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.query.category;
    if (!category) {
        res.status(400).json({ message: 'Category is required' });
        return;
    }
    try {
        const recipes = yield Recipe_1.default.find({ category });
        res.status(200).json(recipes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Search failed', error });
    }
});
exports.searchRecipesByCategory = searchRecipesByCategory;
