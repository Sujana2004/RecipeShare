import { Component, NgModule } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  imports: [CommonModule,ReactiveFormsModule,NgModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  title: string = '';
  description: string = '';
  category: string = '';
  file: File | null = null;

  constructor(private recipeService: RecipeService, private router: Router) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  uploadRecipe(): void {
    if (!this.title || !this.description || !this.category || !this.file) {
      alert('Please fill in all fields and select a file');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('category', this.category);
    formData.append('file', this.file);

    this.recipeService.uploadRecipe(formData).subscribe({
      next: (data) => {
        console.log('Recipe uploaded successfully:', data);
        this.router.navigate(['/home']);  // Redirect to home page after upload
      },
      error: (err) => {
        console.error('Error uploading recipe:', err);
      }
    });
  }
}
