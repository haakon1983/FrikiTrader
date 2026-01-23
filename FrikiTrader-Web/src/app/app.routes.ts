import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/home/home';
import { CreateProduct } from './features/products/create-product/create-product';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register},
  { path: 'home', component: Home },
  { path: 'vender', component: CreateProduct },
  // Redirección inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
