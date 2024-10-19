import { FC, useEffect, useState } from 'react';
import { getProducts } from '../../services/api';
import { Container, ProductList } from '../../components';
import { IProduct } from '../../types/product';

export const Products: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError('Ошибка при загрузке продуктов');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <h2>Товары: </h2>
      <ProductList loading={loading} error={error} products={products} />
    </Container>
  );
};
