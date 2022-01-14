import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './ProductPage.module.scss';

import { addItemInCart, ProductsType } from 'bll/cartReducer';
import { AppRootStateType } from 'bll/store';

type PropsType = {
  products: ProductsType[];
};

export const ProductPage: FC<PropsType> = ({ products }) => {
  const dispatch = useDispatch();
  const totalPrice = useSelector<AppRootStateType, number>(
    st => st.cartReducer.totalPriceCount,
  );

  const addItemHandle = (item: ProductsType): void => {
    let productItems = JSON.parse(localStorage.getItem('product')!);
    if (productItems === null) productItems = [];
    localStorage.setItem('product', JSON.stringify(item));
    productItems.push(item);
    localStorage.setItem('product', JSON.stringify(productItems));
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
          {totalPrice}
        </div>
      ))}
    </div>
  );
};
