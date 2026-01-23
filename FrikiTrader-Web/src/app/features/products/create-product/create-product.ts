import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss',
})
export class CreateProduct {
  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isUploading: boolean = false;

  // Maqueta de categorías
  categoriasDummy = [
    { id: 1, nombre: 'Figuras' },
    { id: 2, nombre: 'Cartas TCG' },
    { id: 3, nombre: 'Cómics / Manga' },
    { id: 4, nombre: 'Merchandising' }
  ];

  constructor(private fb: FormBuilder, private storageService: StorageService) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria_id: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    alert('Producto creado con éxito (simulado).');
  }
}