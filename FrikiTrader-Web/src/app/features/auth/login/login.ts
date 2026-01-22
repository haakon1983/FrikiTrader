import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login  implements OnInit {
  email = '';
  password = '';
  showSuccessMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params['registered'] === 'true') {
        this.showSuccessMessage = true;

        // Opcional: Ocultar el mensaje después de unos segundos
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }
    });
  }

  onSubmit(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/home']); // Redirigir a la página principal u otra página después del login
      },
      error: (err) => {
        console.error('Error during login:', err);
      }
    });
  }
}