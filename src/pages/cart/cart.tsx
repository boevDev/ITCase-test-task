import React from 'react';
import { CartList, Container } from '../../components';

export const Cart: React.FC = () => {
  return (
    <Container>
      <h2>Корзина: </h2>

      <CartList />
    </Container>
  );
};
