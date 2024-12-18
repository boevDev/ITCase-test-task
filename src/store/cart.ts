import { makeAutoObservable } from 'mobx';
import { IProductInCart } from '../types/product';

class Cart {
  cartArray: IProductInCart[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = (product: IProductInCart) => {
    return this.cartArray.push(product);
  };

  deleteProduct = (id: Pick<IProductInCart, 'id'> | string) => {
    return (this.cartArray = this.cartArray.filter((item) => item.id !== id));
  };

  cartCleaning = () => {
    this.cartArray = [];
  };
}

const cart = new Cart();
export default cart;
