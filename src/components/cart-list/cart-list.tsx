import { FC } from 'react';
import cart from '../../store/cart';
import { observer } from 'mobx-react-lite';
import { CartItem } from '../cart-item/cart-item';
import { Button } from '../button/button';
import styles from './styles.module.css';

export const CartList: FC = observer(() => {
  const { cartArray, cartCleaning } = cart;

  if (cartArray.length <= 0) {
    return <p>В вашей корзине пока нет ни одного товара {';('}</p>;
  }

  return (
    <div>
      <Button onClick={cartCleaning}>Очистить корзину</Button>
      <div className={styles.cartList}></div>
      {cartArray.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </div>
  );
});
