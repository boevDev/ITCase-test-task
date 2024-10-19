import { FC } from 'react';
import cart from '../../store/cart';
import { observer } from 'mobx-react-lite';
import { CartItem } from '../cart-item/cart-item';

export const CartList: FC = observer(() => {
  const { cartArray } = cart;

  console.log(cartArray);

  if (cartArray.length <= 0) {
    return <p>В вашей корзине пока нет ни одного товара {';('}</p>;
  }

  return (
    <div>
      {cartArray.map((item) => (
        <CartItem {...item} />
      ))}
    </div>
  );
});
