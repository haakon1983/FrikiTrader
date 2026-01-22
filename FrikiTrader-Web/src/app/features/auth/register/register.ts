import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  username = '';
  email = '';
  password = ''
  avatarUrl: string | null = null;
  selectedFile: File | null = null;

    constructor (
      private router: Router, 
      private authService: AuthService
    ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Guardamos el archivo
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    //Capturamos los datos del formulario
    formData.append('username', this.username);
    formData.append('email', this.email);
    formData.append('password', this.password);
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }
    /*this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        //Redirigimos al login con un query param para mostrar el mensaje de éxito 
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      error: (err) => {
        console.error('Error during registration:', err);
      }
    });*/
    console.log("Formulario enviado");
    this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
  }
}