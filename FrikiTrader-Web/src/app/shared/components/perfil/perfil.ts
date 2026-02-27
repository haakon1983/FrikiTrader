import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product/product-service';
import { Product } from '../../models/product-interface';
import { ProductCard } from '../product-card/product-card';
import Swal from 'sweetalert2';
import { StorageService } from '../../../core/services/storage/storage';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, ProductCard],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  private productService = inject(ProductService);
  misProductos =signal<Product[]>([]);
  loading = signal(true);
  private storageService = inject(StorageService);

  ngOnInit(): void {
    this.cargarMisProductos();
  }

  cargarMisProductos() {
    this.loading.set(true);
    this.productService.getMyProducts().subscribe({
      next: (data) => {
        this.misProductos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar mis productos:', err);
        this.loading.set(false);
      }
    });
  } 

  async eliminarProducto(id: number) {
    const deleteIdProduct = this.misProductos().find(p => p.id === id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        //Borramos la imagen de Firebase antes de eliminar el producto
        if (deleteIdProduct?.imageUrl) {
          try {
            await this.storageService.deleteImageByUrl(deleteIdProduct.imageUrl);
          }catch (error) {
            console.error('Error al eliminar imagen de Firebase:', error);
          }
        }
        //Luego eliminamos el producto de la base de datos
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.misProductos.update(data => data.filter(p => p.id !== id));
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Tu producto ha sido eliminado.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
              background:'#1f2937',
              color: '#f9fafb'
            });
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }

}  
