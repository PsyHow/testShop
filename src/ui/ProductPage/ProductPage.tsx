import { FC } from 'react';

import { useDispatch } from 'react-redux';

import styles from './ProductPage.module.scss';

import { addItemInCart, ProductsType } from 'bll/cartReducer';

type PropsType = {
  products: ProductsType[];
};

export const ProductPage: FC<PropsType> = ({ products }) => {
  const dispatch = useDispatch();

  const addItemHandle = (item: ProductsType): void => {
    dispatch(addItemInCart(item));
  };

  return (
    <div className={styles.productBox}>
      {products.map(items => (
        <div key={items.id} className={styles.productItem}>
          <div className={styles.productPhoto}>{items.photo}</div>
          <b>Наименование: </b>
          <span>{items.name}</span>
          <b>Цена: </b>
          <span>{items.price}</span>
          <button onClick={() => addItemHandle(items)} type="button">
            Добавить в корзину
          </button>
        </div>
      ))}
    </div>
  );
};
