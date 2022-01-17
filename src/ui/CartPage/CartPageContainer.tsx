import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CartPage } from './CartPage';
import styles from './CartPage.module.scss';
import { Order } from './Oreder/Order';

import {
  decrementItemCount,
  deleteItem,
  getItemsInCart,
  getTotalPrice,
  incItemCount,
  ProductsType,
} from 'bll/cartReducer';
import { selectItems, selectTotalPriceCount } from 'selectors/selectors';

export const CartPageContainer: FC = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPriceCount);

  useEffect(() => {
    const valueAsString = localStorage.getItem('product');
    if (valueAsString) {
      const itemsLocal = JSON.parse(valueAsString);
      dispatch(getItemsInCart(itemsLocal));
      dispatch(getTotalPrice(totalPrice));
    }
  }, []);

  const inc = (products: ProductsType): void => {
    dispatch(incItemCount(products));
  };
  const decrement = (item: ProductsType): void => {
    dispatch(decrementItemCount(item));
    if (item.itemCount <= 1) {
      dispatch(deleteItem(item.id));
    }
  };

  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(itemsInCart));
  }, [itemsInCart]);

  return (
    <div className={styles.cartBox}>
      <Order />
      <CartPage inc={inc} items={itemsInCart} decrement={decrement} />
      <div>
        <b>Сумма покупок: </b>
        {totalPrice}
      </div>
    </div>
  );
};
