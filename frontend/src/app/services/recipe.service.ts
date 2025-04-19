import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:5000/api/recipes';

  constructor(private http: HttpClient) {}

  // Upload a recipe (with file)
  uploadRecipe(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:5000/api/recipes/upload', formData);
  }
  

  // Get all recipes
  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`, { withCredentials: true });
  }

  // Search recipes by category
  searchRecipesByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/recipes/search?category=${category}`);
  }
  

  
}
