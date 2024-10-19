import { FC, useEffect, useState } from 'react';
import { getSize, getSizes } from '../../services/api';
import { Loader } from '../loader/loader';
import styles from './style.module.css';
import { Button } from '../button/button';
import { IProduct, ISize } from '../../types/product';
import cart from '../../store/cart';
import { observer } from 'mobx-react-lite';

interface Props {
  product: IProduct;
  loading: boolean;
  error: string | null;
}

export const ProductDetails: FC<Props> = observer(
  ({ product, loading, error }) => {
    const [selectedColorId, setSelectedColorId] = useState<number>(1);
    const [allSizes, setAllSizes] = useState<ISize[]>();
    const [availableSizes, setAvailableSizes] = useState<ISize[]>([]);
    const [selectedSizeId, setSelectedSizeId] = useState<number>();

    const colorItem = product.colors.find(
      (color) => color.id === selectedColorId
    );

    const sizeItem = availableSizes.find((size) => size.id === selectedColorId);

    const { cartArray } = cart;

    const onClick = () =>
      colorItem &&
      selectedSizeId &&
      sizeItem &&
      cart.addProduct({
        cartItemId: cartArray.length + 1,
        name: product.name,
        colorName: colorItem.name,
        colorImage: colorItem.images[0],
        price: colorItem.price,
        size: sizeItem,
      });

    useEffect(() => {
      const fetchAllSizes = async () => {
        try {
          const data = await getSizes();
          setAllSizes(data);
        } catch (error) {
          console.error('Ошибка при загрузке размеров: ', error);
        }
      };

      fetchAllSizes();
    }, []);

    useEffect(() => {
      const fetchSizes = async () => {
        try {
          if (colorItem?.sizes) {
            const data = await Promise.all(
              colorItem.sizes.map((size) => getSize(size))
            );
            setAvailableSizes(data);
          }
        } catch (error) {
          console.error('Ошибка при загрузке данных: ', error);
        }
      };

      fetchSizes();
    }, [colorItem]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
      product && (
        <div className={styles.container}>
          <div>
            <img
              src={
                colorItem ? colorItem?.images[0] : product.colors[0].images[0]
              }
              alt={product.name}
              width={320}
            />
            <img
              src={
                colorItem ? colorItem?.images[1] : product.colors[0].images[1]
              }
              alt={product.name}
              width={320}
            />
          </div>

          <div className={styles.info}>
            <div>
              <h2 className={styles.title}>{product.name}</h2>

              <div className={styles.details}>
                <div className={styles.colors}>
                  <label htmlFor='colors'>Цвет: </label>
                  <select
                    value={selectedColorId}
                    onChange={(e) => {
                      setSelectedSizeId(undefined);
                      setSelectedColorId(Number(e.target.value));
                    }}
                    name='colors'
                    id='colors'
                  >
                    {product.colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.sizes}>
                  {
                    <>
                      <label htmlFor='sizes'>Размер: </label>
                      <select
                        defaultValue={1}
                        name='sizes'
                        id='sizes'
                        value={!selectedSizeId ? '' : selectedSizeId}
                        disabled={availableSizes.length <= 0 && true}
                        onChange={(e) =>
                          setSelectedSizeId(Number(e.target.value))
                        }
                      >
                        {availableSizes.length > 0 && allSizes ? (
                          allSizes.map((size) => (
                            <>
                              <option hidden selected>
                                Выберите размер...
                              </option>
                              <option
                                disabled={
                                  !availableSizes.includes(size) && true
                                }
                                key={size.id}
                                value={size.id}
                              >
                                {`${size.label} | ${size.number}`}
                              </option>
                            </>
                          ))
                        ) : (
                          <option selected>Нет размеров {';('}</option>
                        )}
                      </select>
                    </>
                  }
                </div>

                <div>{colorItem?.description}</div>
              </div>
            </div>

            <Button
              className={styles.btn}
              disabled={!colorItem || (!selectedSizeId && true)}
              onClick={onClick}
            >
              В корзину за {colorItem?.price} ₽
            </Button>
          </div>
        </div>
      )
    );
  }
);
