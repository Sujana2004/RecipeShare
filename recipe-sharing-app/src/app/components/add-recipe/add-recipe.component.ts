import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  imports: [],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})


export class AddRecipeComponent {
  recipe = { id: 0, title: '', ingredients: [], instructions: '', category: '', file: new File([], '') };

  constructor(private recipeService: RecipeService, private router: Router) {}

  addRecipe() {
    this.recipeService.addRecipe(this.recipe).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}