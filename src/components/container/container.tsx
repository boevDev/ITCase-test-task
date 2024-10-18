import { FC, ReactNode } from 'react';
import styles from './style.module.css';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container: FC<Props> = ({ children, className }) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
