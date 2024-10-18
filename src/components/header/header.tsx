import { FC } from 'react';
import styles from './style.module.css';
import { Container } from '../container/container';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';

export const Header: FC = () => {
  return (
    <header className={styles.wrapper}>
      <Container className={styles.container}>
        <a href='/'>
          <h1 className={styles.title}>Store.ru</h1>
        </a>

        <NavLink
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          to='/cart'
        >
          <FaCartShopping size={48} color='white' />
        </NavLink>
      </Container>
    </header>
  );
};
