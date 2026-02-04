import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage/storage';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product/product-service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss',
})
export class CreateProduct implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  loading: boolean = false;
  categorias = signal<any[]>([]);
  estados = signal<any[]>([]);

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

  constructor(private fb: FormBuilder, private storageService: StorageService, private router: Router, private productService: ProductService) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      condition: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.cargarSelects();
  }

  cargarSelects(): void{
    this.productService.getCategories().subscribe(data => this.categorias.set(data));
    this.productService.getConditions().subscribe(data => this.estados.set(data));
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.productForm.invalid || !this.selectedFile) {
      alert ("Por favor, rellena todos los campos y sube una imagen");
      return;
    }
    this.loading = true;
    try {
      await this.productService.crearProducto(this.productForm.value, this.selectedFile);
      alert("¡Producto publicado!");
      this.router.navigate(['/home']); 
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}