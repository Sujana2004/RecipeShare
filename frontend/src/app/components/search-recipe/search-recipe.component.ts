import { Component, NgModule } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-recipe',
  imports: [CommonModule, ReactiveFormsModule,NgModule],
  templateUrl: './search-recipe.component.html',
  styleUrl: './search-recipe.component.css'
})
export class SearchRecipesComponent {
  category: string = '';
  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  searchRecipes(): void {
    if (this.category.trim()) {
      this.recipeService.searchRecipesByCategory(this.category).subscribe({
        next: (data) => {
          this.recipes = data as any[];
        },
        error: (err) => {
          console.error('Error fetching recipes by category:', err);
        }
      });
    } else {
      alert('Please enter a category');
    }
  }
}
