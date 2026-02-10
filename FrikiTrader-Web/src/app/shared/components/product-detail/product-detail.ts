import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product-interface';
import { ProductService } from '../../../core/services/product/product-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  if (confirm('¿Quieres comprar este artículo?')) {
    // Aquí llamaríamos a un service.venderProducto(id)
    // que haga un PATCH en C# para poner el producto como 'Vendido'
    alert('¡Compra realizada! El artículo ya no estará disponible.');
    this.router.navigate(['home']);
  }
}

  getCategoryLabel(categoryId: any): string {
    const categories: any = {
      1: 'Comics y Manga',
      2: 'Figuras y muñecos',
      3: 'Videojuegos',
      4: 'Juegos de Mesa',
      5: 'Juegos de catas',
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
