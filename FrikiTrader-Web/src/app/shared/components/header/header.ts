import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule} from "@angular/router";
import { Router,RouterLink } from "@angular/router";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('ft_token');
  } 

  logout() {
    localStorage.removeItem('ft_token');
    this.router.navigate(['/login']);
  }
}
