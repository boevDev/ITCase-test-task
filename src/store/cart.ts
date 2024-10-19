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

  // uslovie = (item: IProductInCart, product: IProductInCart) => {
  //   if (
  //     item.id !== product.id &&
  //     item.colorId !== product.colorId &&
  //     product.size.id !== product.size.id
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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
