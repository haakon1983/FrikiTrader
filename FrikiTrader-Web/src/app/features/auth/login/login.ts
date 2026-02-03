import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { OnInit } from "@angular/core";
import { FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth';
import { Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login  implements OnInit {
  email = '';
  password = '';
  showSuccessMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

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
    if(this.loginForm.valid){
      const datosLogin = {
        Email: this.loginForm.value.email,
        Password: this.loginForm.value.password
      };
    this.authService.login(datosLogin).subscribe({
      next: () => {
        this.router.navigate(['/home']); // Redirigir a la página principal u otra página después del login
      },
      error: (err) => {
        console.error('Error 400 detectado:', err);
      }
    });
  }
}

}
