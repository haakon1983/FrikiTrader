import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/home/home';
import { CreateProduct } from './features/products/create-product/create-product';
import { ProductDetail } from './shared/components/product-detail/product-detail';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register},
  { path: 'home', component: Home },
  { path: 'vender', component: CreateProduct },
  { path: 'product/:id', component: ProductDetail},
  // Redirección inicial
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
  
];
