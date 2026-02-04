import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth';
import { StorageService } from '../../../core/services/storage/storage';  

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
  isSubmitting: boolean = false;

    constructor (
      private router: Router, 
      private authService: AuthService,
      private storageService: StorageService
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

  async onSubmit() {
    if (this.isSubmitting) return; 
    this.isSubmitting = true;
    try{
      let finalImageUrl = '';
      //1. Subimos la imagen si existe a Firebase Storage
      if (this.selectedFile) {
        finalImageUrl = await this.storageService.uploadImage(this.selectedFile, 'avatars');
          console.log('Imagen subida con URL:', finalImageUrl);
      }
    //2. Creamos el JSON con los datos del formulario para enviar a C#.
      const userDTO = {
        Username: this.username,
        Email: this.email,
        Password: this.password,
        ProfilePictureUrl: finalImageUrl // Usamos la URL subida o vacía
      };
    //3. Enviamos el formulario al servicio de Auth
      this.authService.register(userDTO).subscribe({
        next: (response) => {
          console.log('Registro satisfactorio:', response); 
          //Redirigimos al login con un query param para mostrar el mensaje de éxito 
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        error: (err) => {
          console.error('Error en el registro:', err);
        }
      });

    }catch(error){
      console.error('Error al subir la imagen:', error);
    }
  }
}
// 
