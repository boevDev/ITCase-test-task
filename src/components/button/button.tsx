import clsx from 'clsx';
import styles from './style.module.css';
import { ComponentProps, FC, ReactNode } from 'react';

interface Props extends ComponentProps<'button'> {
  children?: ReactNode;
}

export const Button: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(styles.btn, className)} {...props}>
      {children}
    </button>
  );
};
