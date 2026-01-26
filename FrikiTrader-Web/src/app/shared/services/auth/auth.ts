import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { form } from '@angular/forms/signals';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL del servidor
  //Signal para gestionar el estado de autenticación
  public currentUser = signal<any>(null);

  constructor(private http: HttpClient) {
    this.checkSession();
  }

  //Usamos FormData porque incluimos el avatar (archivo)
  register(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, formData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.user) {
          localStorage.setItem('token', response.token); // Guardamos el token en localStorage
          this.currentUser.set(response.user || { nombre: 'Usuario' });
        }
      }) 
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private checkSession() {
    const token = this.getToken();    
    if (token) {
      // Aquí podrías hacer una llamada al backend para validar el token y obtener los datos del usuario
      // Por simplicidad, asumimos que el token es válido y establecemos un usuario simulado
      this.currentUser.set({ userName: 'Usuario' });
    }
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
