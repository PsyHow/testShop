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
import { AppRootStateType } from 'bll/store';

export const CartPageContainer: FC = () => {
  const dispatch = useDispatch();

  const inc = (items: ProductsType): void => {
    dispatch(incItemCount(items));
  };
  const decrement = (items: ProductsType): void => {
    dispatch(decrementItemCount(items));
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (items.itemCount <= 1) {
      dispatch(deleteItem(items.id));
    }
  };
  const items = useSelector<AppRootStateType, ProductsType[]>(st => st.cartReducer.items);
  const totalPrice = useSelector<AppRootStateType, number>(
    st => st.cartReducer.totalPriceCount,
  );

  useEffect(() => {
    const valueAsString = localStorage.getItem('product');
    if (valueAsString) {
      const itemsLocal = JSON.parse(valueAsString);
      dispatch(getItemsInCart(itemsLocal));
      dispatch(getTotalPrice(totalPrice));
    }
  }, []);

  return (
    <div className={styles.cartBox}>
      <Order />
      <CartPage inc={inc} items={items} decrement={decrement} />
      <div>
        <b>Сумма покупок: </b>
        {totalPrice}
      </div>
    </div>
  );
};
