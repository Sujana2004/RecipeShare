import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { CommonModule } from '@angular/common';
import { SearchRecipesComponent } from './components/search-recipe/search-recipe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RegisterComponent,
    LoginComponent,
    UploadComponent,
    RecipeListComponent,
    SearchRecipesComponent,
    HomeComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe Sharing App';
}
