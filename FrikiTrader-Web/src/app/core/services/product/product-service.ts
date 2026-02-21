import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage';
import { Title } from '@angular/platform-browser';
import { Product } from '../../../shared/models/product-interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = environment.apiUrl
  private productsUrl = `${environment.apiUrl}/products`; 

  constructor(private http: HttpClient, private storage: StorageService) {}

  async crearProducto(productoData: any, imagen: File) {
    // 1. Subir la foto a Firebase (en una carpeta 'productos')
    const urlImagen = await this.storage.uploadImage(imagen, 'productos');
    const payload = {
      title: productoData.nombre,
      description: productoData.description,
      price: Number(productoData.precio), 
      categoryId: Number(productoData.categoryId),
      condition: Number(productoData.condition),
      imageUrl: urlImagen,

    };

    return firstValueFrom(this.http.post(this.productsUrl, payload));
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Categories`);
  }

  getConditions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.productsUrl}/conditions`);
  }

  getProducts(filtros?: any): Observable<Product[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.categoryId) params = params.set('categoryId', filtros.categoryId);
      if (filtros.order) params = params.set('order', filtros.order);
      if (filtros.onlyFavorites) params = params.set('onlyFavorites', filtros.onlyFavorites);
  
      if (filtros.searchTerm && filtros.searchTerm !== 'undefined') params = params.set('searchTerm', filtros.searchTerm);
    }
    return this.http.get<Product[]>(this.productsUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  buyProduct(id: number): Observable<any> {
    return this.http.patch(`${this.productsUrl}/${id}/buy`, {});
  }
}
