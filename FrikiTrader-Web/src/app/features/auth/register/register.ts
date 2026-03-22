import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth';
import { StorageService } from '../../../core/services/storage/storage';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
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
      this.selectedFile = file; // Guardamos el archivo del avatar 
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    if (this.isSubmitting) return;

    //Validaciones
    if (!this.username || !this.email || !this.password) {
      Swal.fire ('Campos incompletos', 'Por favor, rellene todos los campos obligatorios.', 'warning');
      return;
    } 
    if (this.password.length<6) {
      Swal.fire ('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.', 'info');
      return;
    }

    //Iniciamos proceso de registro.
    this.isSubmitting = true;

    //Mostramos un loading mientras se sube la imagen y se registra.
    Swal.fire ({
      title: 'Creando  cuenta...',
      text: 'Estamos registrando tu perfil en FrikiTrader',
      allowOutsideClick: false,
      didOpen: () =>{
        Swal.showLoading();
      }
    });

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
          Swal.close(); //cerramos el loading
          //Redirigimos al login con un query param para mostrar el mensaje de éxito 
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        error: (err) => {
          this.isSubmitting = false; //Liberamos el botón si falla.
          console.error('Error en el registro:', err);
          
          Swal.fire({
            icon:  'error',
            title: 'Error en el registro',
            text: err.error?.message || 'El usuario o el email ya existen.'
          });
        }
      });

    }catch(error){
      console.error('Error al subir la imagen:', error);
      Swal.fire('Error', 'Hubo un problema al subir la imagen', 'error')
    }
  }
}

