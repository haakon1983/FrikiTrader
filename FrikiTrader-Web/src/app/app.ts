import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from "@angular/router";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('FrikiTrader-Web');

  get isAuthPage(): boolean {
    const currentRoute = this.router.url.split('?')[0];
    const authRoutes = ['/login', '/register'];
    return authRoutes.includes(currentRoute);
  }
}
