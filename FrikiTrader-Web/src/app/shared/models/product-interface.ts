export interface Product {
    id?: number;
    title: string;
    price: number;
    imageUrl: string;
    condition: number | string;
    categoryId: number;
    description: string;
    status: 'Disponible' | 'Vendido';
    isFavorite?: boolean; // Para marcar si el producto es favorito del usuario
}
