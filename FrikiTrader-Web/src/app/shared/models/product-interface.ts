export interface Product {
    id?: number;
    title: string;
    price: number;
    imageUrl: string;
    condition: number | string;
    categoryName?: string;
}
