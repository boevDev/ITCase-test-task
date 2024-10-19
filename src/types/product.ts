export interface IProduct {
  id: number;
  name: string;
  colors: IProductColor[];
}

export interface IProductColor {
  id: number;
  name: string;
  images: string[];
  price: string;
  description: string;
  sizes: number[];
}

export interface ISize {
  id: number;
  label: 'XS' | 'S' | 'M' | 'L' | 'XL';
  number: 44 | 46 | 48 | 50 | 52;
}

export interface IProductInCart {
  cartItemId: number;
  id: number;
  name: string;
  colorId: number;
  colorName: string;
  colorImage: string;
  size: ISize;
  price: string;
}
