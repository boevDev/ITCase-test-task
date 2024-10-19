import { FC } from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  name: string;
  image: string;
}

export const ProductCard: FC<Props> = ({ id, name, image }) => {
  return (
    <Link to={`/product/${id}`} className={styles.card}>
      <img width={200} src={image} alt={name} />
      <div className={styles.title}>{name}</div>
    </Link>
  );
};
