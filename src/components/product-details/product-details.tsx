import { FC, useEffect, useState } from 'react';
import { getSize, getSizes } from '../../services/api';
import { Loader } from '../loader/loader';
import styles from './style.module.css';
import { Button } from '../button/button';
import { IProduct, ISize } from '../../types/product';
import cart from '../../store/cart';
import { Slider } from '../slider/slider';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  product: IProduct;
  loading: boolean;
  error: string | null;
}

export const ProductDetails: FC<Props> = ({ product, loading, error }) => {
  const [selectedColorId, setSelectedColorId] = useState<number>(1);
  const [allSizes, setAllSizes] = useState<ISize[]>();
  const [availableSizes, setAvailableSizes] = useState<ISize[]>([]);
  const [selectedSizeId, setSelectedSizeId] = useState<
    number | string | undefined
  >('selectSize');

  const colorItem = product.colors.find(
    (color) => color.id === selectedColorId
  );

  const sizeItem = availableSizes.find((size) => size.id === selectedColorId);

  const onClick = () =>
    colorItem &&
    selectedSizeId &&
    sizeItem &&
    cart.addProduct({
      id: uuidv4(),
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
          <Slider widthItem={320}>
            {colorItem?.images.map((image, index) => (
              <img key={index} src={image} alt={colorItem.name} />
            ))}
          </Slider>
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
                      name='sizes'
                      id='sizes'
                      value={!selectedSizeId ? 'selectSize' : selectedSizeId}
                      disabled={availableSizes.length <= 0 && true}
                      onChange={(e) =>
                        setSelectedSizeId(Number(e.target.value))
                      }
                    >
                      {availableSizes.length > 0 && allSizes ? (
                        <>
                          <option value={'selectSize'}>
                            Выберите размер...
                          </option>
                          {allSizes.map((size) => (
                            <option
                              disabled={!availableSizes.includes(size) && true}
                              key={size.id}
                              value={size.id}
                            >
                              {`${size.label} | ${size.number}`}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value={'lackOfSizes'}>
                          Нет размеров {';('}
                        </option>
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
};
