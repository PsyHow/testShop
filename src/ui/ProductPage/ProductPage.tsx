import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './ProductPage.module.scss';

import { ProductsType } from 'bll/cartReducer';
import { itemIsAdded } from 'bll/productReducer';
import { selectItemsForProductPage } from 'selectors/selectors';

export const ProductPage: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectItemsForProductPage);

  const addItemHandle = (item: ProductsType): void => {
    const productItems = JSON.parse(localStorage.getItem('product') || '[]');
    productItems.push(item);
    localStorage.setItem('product', JSON.stringify(productItems));
    dispatch(itemIsAdded(item));
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
          <button
            onClick={() => addItemHandle(item)}
            type="button"
            disabled={item.isAdded}
          >
            {!item.isAdded ? 'Добавить в корзину' : 'Товар добавлен в корзину'}
          </button>
        </div>
      ))}
    </div>
  );
};
