import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product/product-service';

@Component({
  selector: 'app-product-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.scss',
})
export class ProductFilters {
  private productService = inject(ProductService);
  categories: any[] = [];

  filters = {
    categoryId: '',
    order: 'newest',
    onlyFavorites: false
  };

  @Output() filtersChange = new EventEmitter<any>();

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  applyFilters() {
    this.filtersChange.emit({ ...this.filters });
  }

}
