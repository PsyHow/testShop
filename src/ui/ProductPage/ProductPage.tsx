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
    const productItems = JSON.parse(localStorage.getItem('product') || '[]');
    productItems.push(item);
    localStorage.setItem('product', JSON.stringify(productItems));
    dispatch(addItemInCart(item));
  };

  return (
    <div className={styles.productBox}>
      {products.map(item => (
        <div key={item.id} className={styles.productItem}>
          <div className={styles.productPhoto}>{item.photo}</div>
          <b>Наименование: </b>
          <span>{item.name}</span>
          <b>Цена: </b>
          <span>{item.price}</span>
          <button onClick={() => addItemHandle(item)} type="button">
            Добавить в корзину
          </button>
        </div>
      ))}
    </div>
  );
};
