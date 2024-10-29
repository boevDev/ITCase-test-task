import {
  FC,
  ReactNode,
  useEffect,
  useState,
  Children,
  cloneElement,
  ReactElement,
} from 'react';
import styles from './style.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface Props {
  children: ReactNode;
  widthItem: number;
}

export const Slider: FC<Props> = ({ children, widthItem }) => {
  const [items, setItems] = useState<ReactElement[]>([]);
  const [offset, setOffset] = useState(0);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + widthItem;

      return Math.min(newOffset, 0);
    });
  };

  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - widthItem;

      const maxOffset = -(widthItem * (items.length - 1));

      return Math.max(newOffset, maxOffset);
    });
  };

  useEffect(() => {
    setItems(
      Children.toArray(children)
        .filter((child) => !!child && typeof child !== 'string')
        .map((child) =>
          cloneElement(child as ReactElement, {
            style: {
              height: '100%',
              minWidth: `${widthItem}px`,
              maxWidth: `${widthItem}px`,
            },
          })
        )
    );
  }, [children, widthItem]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FaChevronLeft className={styles.arrow} onClick={handleLeftArrowClick} />
      <div style={{ width: widthItem }}>
        <div className={styles.window}>
          <div
            className={styles.allItemsContainer}
            style={{ transform: `translateX(${offset}px)` }}
          >
            {items}
          </div>
        </div>
      </div>
      <FaChevronRight
        className={styles.arrow}
        onClick={handleRightArrowClick}
      />
    </div>
  );
};
