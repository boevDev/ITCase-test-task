import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import styles from './style.module.css';
import { observer } from 'mobx-react-lite';
import cart from '../../store/cart';

export const Cart: FC = observer(() => {
  const { cartArray } = cart;

  return (
    <NavLink
      className={styles.block}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      to='/cart'
    >
      <FaCartShopping size={48} color='white' />
      {cartArray.length > 0 && (
        <div className={styles.counter}>{cartArray.length}</div>
      )}
    </NavLink>
  );
});
