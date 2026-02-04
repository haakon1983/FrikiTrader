import { inject, Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage = inject(Storage);

  /**
   * Sube una imagen a Firebase y devuelve su URL
   * @param file El archivo de imagen (desde el input file)
   * @param folder Carpeta donde se guardará (ej: 'products' o 'avatars')
   */
  
  async uploadImage(file: File, folder: string = 'products'): Promise<string> {
    try {
      // 1. Creamos una ruta única para la imagen usando el tiempo actual para evitar duplicados
      const filePath = `${folder}/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);

      // 2. Subimos el archivo
      const result = await uploadBytes(fileRef, file);

      // 3. Obtenemos y devolvemos la URL pública
      return await getDownloadURL(result.ref);
    } catch (error) {
      console.error('Error al subir imagen a Firebase:', error);
      throw error;
    }
  }
}
