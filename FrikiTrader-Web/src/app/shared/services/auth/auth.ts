import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { form } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:3000/api'; // URL del futuro servidor
  //Signal para gestionar el estado de autenticación
  public currentUser = signal<any>(null);

  constructor(private http: HttpClient) {}

  //Usamos FormData porque incluimos el avatar (archivo)
  register(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, formData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
