import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product-interface';
import { ProductService } from '../../../core/services/product/product-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit{
  product = signal<Product | null>(null);
  isFavorite = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public router: Router
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
    this.isFavorite.update(value => !value);

    if (this.isFavorite()){
      console.log("Guardado en mis favoritos")
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
  
  /*if (confirm(`¿Estás seguro de que quieres comprar "${p.title}" por ${p.price}€?`)) {
    this.productService.buyProduct(p.id).subscribe({
      next: () => {
        alert('¡Compra realizada con éxito!');
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error('Error al comprar el producto', err);
        alert('Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.');
      }
    });
  }*/
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
