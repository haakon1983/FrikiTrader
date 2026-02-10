import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Product } from '../../shared/models/product-interface';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ProductService } from '../../core/services/product/product-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, Footer, ProductCard],
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
