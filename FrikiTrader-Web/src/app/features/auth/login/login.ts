import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { OnInit } from "@angular/core";
import { FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth';
import { Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
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
    if(this.loginForm.invalid) {
      //Validación manual si intentan pulsar el botón con campos vacíos.
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, introduce un email válido y tu contraseña.',
        confirmButtonColor:'#3085d6'
      })
      return;
    }
      const datosLogin = {
        Email: this.loginForm.value.email,
        Password: this.loginForm.value.password
      };
      //Llamada al servicio de autenticación con servicio de errores
    this.authService.login(datosLogin).subscribe({
      next: () => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        
        Toast.fire({
          icon: 'success',
          title: 'Sesión iniciada'
        });
        this.router.navigate(['/home']); // Redirigir a la página principal u otra página después del login
      },
      error: (err) => {
        console.error('Error 400 detectado:', err);
        Swal.fire({
          icon:'error',
          title: 'Error de acceso',
          text: 'El correo o la contraseña no son correctos. Revisa tus datos.',
          confirmButtonColor: '#d33',
        })
      }
    });
  }
}


