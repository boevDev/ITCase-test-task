import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, IProduct } from '../services/api';
import { Container, ProductDetails } from '../components';

export const Product: FC = () => {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
      } catch {
        setError('Ошибка при загрузке страницы продукта');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <ProductDetails product={product} loading={loading} error={error} />
    </Container>
  );
};
