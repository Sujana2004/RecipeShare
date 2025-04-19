"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../middleware/upload"));
const recipeController_1 = require("../controllers/recipeController");
const router = (0, express_1.Router)();
router.post('/upload', upload_1.default.single('file'), recipeController_1.createRecipe);
router.get('/all', recipeController_1.getAllRecipes);
router.get('/search', recipeController_1.searchRecipesByCategory);
exports.default = router;
