import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product-interface';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ProductService } from '../../core/services/product/product-service';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCard, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  productos = signal<Product[]>([]);
  loading = signal<boolean>(true);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }
  
  cargarProductos() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
        this.loading.set(false)
      }
    })
  }



}
