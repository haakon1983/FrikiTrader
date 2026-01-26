import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage';
import { Router } from '@angular/router';

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

  //Muestra de estados:
  estadosDummy = [
    { id: 1, nombre: 'Nuevo' },
    { id: 2, nombre: 'Como nuevo' },
    { id: 3, nombre: 'Usado, en buen estado' },
    { id: 4, nombre: 'Para piezas o no funcional' }
  ];

  constructor(private fb: FormBuilder, private storageService: StorageService, private router: Router) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      estado: ['', Validators.required],
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

  goBack(): void {
    this.router.navigate(['/home']);
  }
}