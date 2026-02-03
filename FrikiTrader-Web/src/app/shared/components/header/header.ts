import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule} from "@angular/router";
import { Router,RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  //currentUser = this.authService.currentUser;
  constructor(private router: Router, public authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.currentUser()?.userName || 'Usuario';
  } 

  getUserName(): string {
    const user = this.authService.currentUser();
    return user ? user.userName : 'Usuario';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
