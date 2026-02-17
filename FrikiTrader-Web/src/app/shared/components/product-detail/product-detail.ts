import { Component, OnInit, signal, inject } from '@angular/core';
import { Product } from '../../models/product-interface';
import { ProductService } from '../../../core/services/product/product-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../core/services/favorites/favorites-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit{
  product = signal<Product | null>(null)
  //private productService = inject(ProductService);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,  
    public router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(Number(id)).subscribe({
        next: (data) => {
          this.product.set(data);
          console.log('Datos cargados:', data);
        },
        error: (err) => console.error('Error al cargar detalle del producto', err)
      });
    }
  }

  //Para los botones
  toggleFavorite() {
    const p = this.product();
    if (!p || !p.id) return;

    if (p.isFavorite) {
      this.favoritesService.removeFavorite(p.id).subscribe({
        next: () => {
          this.product.update(prev => prev ? {...prev, isFavorite: false} : null);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: 'Producto eliminado de favoritos',
            showConfirmButton: false,
            timer: 1500
          });
        },
      });
    } else {
      this.favoritesService.addFavorite(p.id).subscribe({
        next: () => {
          this.product.update(prev => prev ? {...prev, isFavorite: true} : null);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Producto añadido a favoritos',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (err) => {          
          if (err.status === 401){
            alert('Debes iniciar sesión para agregar a favoritos');
          }

        }
      });
    }
  }

  comprar() {
  const p = this.product();
  if (!p || !p.id) return;

  Swal.fire({
    title: '¿Confirmar compra?',
    text: `Vas a comprar "${p.title}" por ${p.price}€. Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ffc107', // El amarillo de tu diseño
    cancelButtonColor: '#333',
    confirmButtonText: 'Sí, ¡comprar!',
    cancelButtonText: 'Cancelar',
    background: '#f8f9fa',
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.buyProduct(p.id!).subscribe({  
        next: () => {
          Swal.fire({
            title: '¡Compra realizada!',
            text: `Has comprado "${p.title}" por ${p.price}€. ¡Gracias por tu compra!`,
            icon: 'success',
            timer:2000,
            showConfirmButton: false,
          });
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error al comprar el producto', err); 
        }
      });
    } 
  });
}

  getCategoryLabel(categoryId: any): string {
    const categories: any = {
      1: 'Comics y Manga',
      2: 'Figuras y muñecos',
      3: 'Videojuegos',
      4: 'Juegos de Mesa',
      5: 'Juegos de cartas',
      6: 'Wargames',
      7: 'Merchandising'
    };
    return categories[categoryId] || 'General';
  }

  getConditionLabel(condition: any): string {
    const labels: any = {
      'New': 'Nuevo',
      'LikeNew': 'Como nuevo',
      'Good': 'Buen estado',
      'Used': 'Usado',
      'ForParts': 'Para piezas',
      1: 'Nuevo',
      2: 'Como nuevo',
      3: 'Buen estado',
      4: 'Para piezas'
    };
    return labels[condition] || condition;
  }


}
