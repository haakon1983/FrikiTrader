import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = `${environment.apiUrl}/Favorites`;

  constructor(private http: HttpClient) {}

  addFavorite(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}`, {});
  }

  removeFavorite(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
