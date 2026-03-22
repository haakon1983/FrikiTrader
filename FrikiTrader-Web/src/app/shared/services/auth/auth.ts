import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { user } from '@angular/fire/auth';

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
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.token) {
          localStorage.setItem('ft_token', response.token); // Guardamos el token en localStorage
          const decoded = this.decodeToken(response.token);
          if (decoded) {
            const userData = {
              userName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded["unique_name"],
              avatar: decoded["ProfilePictureUrl"] // El claim que añadimos en C#
            };
          this.currentUser.set(userData);
          console.log('Signal después del set:', this.currentUser());
          } 
        } 
      }) 
    );
  }

  getToken(): string | null {
    return localStorage.getItem('ft_token');
  }

  private checkSession() {
  const token = this.getToken();    
  if (token) {
    const decoded: any = this.decodeToken(token); 
    
    if (decoded) {
      this.currentUser.set({
        userName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded["unique_name"],
        avatar: decoded["ProfilePictureUrl"] // El claim que añadimos en C#
      });
    }
  }
}

  logout(): void {
    localStorage.removeItem('ft_token');//Al cerrar sesión borramos el token.
    this.currentUser.set(null);
  }

  private decodeToken(token: string): any {
  try {
    const base64Url = token.split('.')[1]; // Agarramos la parte del medio (Payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
}
