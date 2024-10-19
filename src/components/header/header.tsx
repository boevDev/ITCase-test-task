import { FC } from 'react';
import styles from './style.module.css';
import { Container } from '../container/container';
import { Link } from 'react-router-dom';
import { Cart } from '../cart/cart';

export const Header: FC = () => {
  return (
    <header className={styles.wrapper}>
      <Container className={styles.container}>
        <Link to='/'>
          <h1 className={styles.title}>Store.ru</h1>
        </Link>

        <Cart />
      </Container>
    </header>
  );
};
