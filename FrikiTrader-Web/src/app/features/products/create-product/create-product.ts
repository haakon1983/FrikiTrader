import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../core/services/storage/storage';
import { ActivatedRoute, Router } from '@angular/router';
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
  idProducto: number | null = null;
  editionMode: boolean = false;
  private route = inject(ActivatedRoute);

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

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = +id;
      this.editionMode = true;
      this.loadProductData(this.idProducto); 
    }
  }

  loadProductData(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.productForm.patchValue({
          nombre: data.title,
          precio: data.price,
          condition: data.condition,
          categoryId: data.categoryId,
          description: data.description
        });
        this.imagePreview = data.imageUrl;
      },
      error: (error) => {
        console.error("Error al cargar los datos del producto:", error);
      }
    });
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
    const imageEdition = !this.editionMode && !this.selectedFile;
    if (this.productForm.invalid || imageEdition) {
      Swal.fire ("Por favor, rellena todos los campos" + (imageEdition ? " y sube una imagen" : ""));
      return;
    }
    const confirmacion = await Swal.fire({
      title: this.editionMode ? '¿Guardar cambios?' : '¿Deseas publicar un artículo?',
      text: this.editionMode ? 'Se actualizarán los cambios del artículo.' : 'Se subirá al marketplace y será visible para todos los usuarios.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#333',
      confirmButtonText: this.editionMode ? 'Sí, guardar cambios' : 'Sí, publicar ahora',
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
        if (this.editionMode){
          await this.productService.editarProducto(this.idProducto!, this.productForm.value, this.selectedFile);
        }else{
          await this.productService.crearProducto(this.productForm.value, this.selectedFile!);
        }
        await Swal.fire({
          title: '!Conseguido!',
          text: this.editionMode ? 'Los cambios del artículo se han guardado con éxito.' : 'Tu artículo ha sido publicado con éxito.',
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