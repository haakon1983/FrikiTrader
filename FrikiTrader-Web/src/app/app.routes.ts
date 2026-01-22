import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { authGuard } from './shared/guards/auth-guard';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: Home, // El contenedor con Header/Footer
    canActivate: [authGuard],
    children: [
     // { path: 'home', component: ProductListComponent }, // El listado principal
      //{ path: 'vender', component: CreateProductComponent }, // Formulario
      //{ path: 'producto/:id', component: ProductDetailComponent }, // Detalle
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
