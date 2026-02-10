import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage/storage';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product/product-service';
import Swal from 'sweetalert2';

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
      Swal.fire ("Por favor, rellena todos los campos y sube una imagen");
      return;
    }
    const confirmacion = await Swal.fire({
      title: '¿Deseas publicar un artículo?',
      text: "Se subirá al marketplace y será visible para todos los usuarios.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, publicar ahora',
      cancelButtonText: 'Revisar datos'
    })

    if (confirmacion.isConfirmed){
      this.loading = true;
      Swal.fire({
        title: 'Publicando artículo...',
        text: 'Subiendo imagen y guardando datos',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        await this.productService.crearProducto(this.productForm.value, this.selectedFile);
        await Swal.fire({
          title: '!Conseguido!',
          text: ' Tú artículo ha sido publicado con éxito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
        this.router.navigate(['/home']); 
      } catch (error) {
        console.error("Error al guardar:", error);
        Swal.fire('Error', 'Hubo un problema al guardar los datos del artículo.', 'error')
      } finally {
        this.loading = false;
      }
    }
  }

    goBack(): void {
      this.router.navigate(['/home']);
    }
    
}