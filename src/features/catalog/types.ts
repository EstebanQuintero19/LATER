export interface ProductDto {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: 'COP';
  stock: number;
  supports3dScan: boolean;
  supportsAr: boolean;
  accentColor: string;
}

export type Product = ProductDto;

export function isInStock(product: Pick<Product, 'stock'>): boolean {
  return product.stock > 0;
}
