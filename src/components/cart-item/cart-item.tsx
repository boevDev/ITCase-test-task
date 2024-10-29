import { FC } from 'react';
import { IProductInCart } from '../../types/product';
import styles from './style.module.css';
import { Button } from '../button/button';
import cart from '../../store/cart';
import clsx from 'clsx';

export const CartItem: FC<IProductInCart> = ({
  name,
  price,
  colorName,
  colorImage,
  size,
  id,
}) => {
  const { deleteProduct } = cart;

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <img width={100} src={colorImage} alt={colorName} />
        <h4 className={styles.title}>{name}</h4>
        <div className={styles.item}>
          Стоимость: <span className={styles.text}>{price}</span>
        </div>
        <div className={styles.item}>
          Цвет: <span className={styles.text}>{colorName}</span>
        </div>
        <div className={styles.item}>
          Размер:
          <div className={clsx(styles.text, styles.size)}>
            <span>{size.label}</span> | <span>{size.number}</span>
          </div>
        </div>
        <Button
          onClick={() => {
            deleteProduct(id);
          }}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};
