import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product/product-service';
import { Product } from '../../models/product-interface';
import { ProductCard } from '../product-card/product-card';
import Swal from 'sweetalert2';

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

  eliminarProducto(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
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
