import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/product-interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input ({required: true}) product!: Product;

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
  // Si el ID existe en el mapa, devuelve el nombre. Si no, devuelve 'General'
  return categories[categoryId] || 'General';
}

  toggleFavorite(event: Event) {
    event.stopPropagation();
  }

}
