import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule} from "@angular/router";
import { Router,RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth';
import { SearchService } from '../../../core/services/search/search-service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private searchService = inject(SearchService);
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

  onSearch(termino: string) {
    
    this.searchService.updateSearch(termino);
  } 

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.onSearch('');
    input.focus();
  }
  
}
