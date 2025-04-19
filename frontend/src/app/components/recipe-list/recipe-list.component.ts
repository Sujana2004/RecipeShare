import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  category: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.filteredRecipes = data;
      },
      error: (err) => console.error(err)
    });
  }

  searchByCategory(): void {
    if (!this.category.trim()) {
      this.filteredRecipes = this.recipes;
      return;
    }

    this.recipeService.searchRecipesByCategory(this.category).subscribe({
      next: (data) => {
        this.filteredRecipes = data;
      },
      error: (err) => console.error(err)
    });
  }
}
