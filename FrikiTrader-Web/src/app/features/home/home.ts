import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product-interface';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ProductService } from '../../core/services/product/product-service';
import { RouterModule } from "@angular/router";
import { ProductFilters } from '../../shared/components/product-filters/product-filters';
import { SearchService } from '../../core/services/search/search-service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCard, RouterModule, ProductFilters],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{
  productos = signal<Product[]>([]);
  loading = signal<boolean>(true);
  paginaActual = 1;
  hayMasProductos = signal<boolean>(true);

  private filtrosComponenteMemoria: any = {};
  private searchTermActual: string = '';
  private searchService = inject(SearchService);

  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getToken(); //Al refrescar pagina, forzamos a que verifique la sesión por si acaso.
    this.searchService.currentSearch.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTermActual = term || '';
      this.ejecutarCargaConjunta(true);
    }); 
    this.ejecutarCargaConjunta(true);
  }

  aplicarFiltros(filtros: any) {
    this.filtrosComponenteMemoria = filtros;
    this.ejecutarCargaConjunta(true);
  }

  ejecutarCargaConjunta(reset: boolean = false) {
    this.loading.set(true);
    if (reset) {
      this.paginaActual = 1;
    }
    const filtrosFinales = {
      ...this.filtrosComponenteMemoria,
      searchTerm: this.searchTermActual,
      page: this.paginaActual,
      pageSize: 12
    };
    this.productService.getProducts(filtrosFinales).subscribe({
      next: (data) => {
        if (reset){
          this.productos.set(data);
        } else {
          this.productos.update(current => [...current, ...data]);
        }
        this.hayMasProductos.set(data.length === 12);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);  
        this.loading.set(false);
      }
    });
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

  verMas() {
    this.paginaActual++;
    this.ejecutarCargaConjunta(false);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
