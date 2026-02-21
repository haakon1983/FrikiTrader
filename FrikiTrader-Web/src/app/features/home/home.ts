import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product-interface';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ProductService } from '../../core/services/product/product-service';
import { RouterModule } from "@angular/router";
import { ProductFilters } from '../../shared/components/product-filters/product-filters';
import { SearchService } from '../../core/services/search/search-service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCard, RouterModule, ProductFilters],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  productos = signal<Product[]>([]);
  loading = signal<boolean>(true);

  private filtrosComponenteMemoria: any = {};
  private searchTermActual: string = '';
  private searchService = inject(SearchService);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.searchService.currentSearch.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTermActual = term || '';
      this.ejecutarCargaConjunta();
    }); 
  }

  aplicarFiltros(filtros: any) {
    this.filtrosComponenteMemoria = filtros;
    this.ejecutarCargaConjunta();
  }

  ejecutarCargaConjunta() {
    this.loading.set(true);
    const filtrosFinales = {
      ...this.filtrosComponenteMemoria,
      searchTerm: this.searchTermActual
    };
    console.log('Cargando productos con filtros:', filtrosFinales);
    this.productService.getProducts(filtrosFinales).subscribe({
      next: (data) => {
        this.productos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);  
        this.loading.set(false);
      }
    });
  }


  /*aplicarFiltros(filtros: any) {
    console.log('Filtros aplicados:', filtros);
    this.productService.getProducts(filtros).subscribe({
      next: (data) => {
        this.productos.set(data);
      },
      error: (err) => console.error('Error al aplicar filtros', err)
    });
  }*/


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
