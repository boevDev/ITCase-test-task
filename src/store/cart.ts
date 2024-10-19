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

  deleteProduct = (cartItemId: number) => {
    return (this.cartArray = this.cartArray.filter(
      (item) => item.cartItemId !== cartItemId
    ));
  };

  cartCleaning = () => {
    this.cartArray = [];
  };
}

const cart = new Cart();
export default cart;
