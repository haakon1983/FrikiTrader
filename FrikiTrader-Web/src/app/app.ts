import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from "@angular/router";
import { Header} from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { CreateProduct } from "./features/products/create-product/create-product";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer, CreateProduct],
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
