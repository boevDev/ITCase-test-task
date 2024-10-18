import { FC } from 'react';
import { IProduct } from '../../services/api';
import { Loader } from '../loader/loader';
import styles from './style.module.css';

interface Props {
  product?: IProduct;
  loading: boolean;
  error: string | null;
}

export const ProductDetails: FC<Props> = ({ product, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    product && (
      <div className={styles.container}>
        <div>
          <img
            src={product.colors[0].images[0]}
            alt={product.name}
            width={320}
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{product.name}</h2>

          <select className={styles.colors} name='color' id='color'>
            <option value={1}>Белая</option>
            <option value={2}>Чёрная</option>
            <option value={3}>Жёлтая</option>
          </select>

          <button>В корзину за {product.colors[0].price} ₽</button>
        </div>
      </div>
    )
  );
};
