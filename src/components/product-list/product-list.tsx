import { FC } from 'react';
import { Loader } from '../loader/loader';
import { ProductCard } from '../product-card/product-card';
import styles from './style.module.css';
import { IProduct } from '../../types/product';

interface Props {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

export const ProductList: FC<Props> = ({ products, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.colors[0].images[0]}
          />
        ))}
    </div>
  );
};
