import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CartPage } from './CartPage';

import {
  decrementItemCount,
  deleteItem,
  incItemCount,
  ProductsType,
} from 'bll/cartReducer';
import { selectItems, selectTotalPriceCount } from 'selectors/selectors';

export const CartPageContainer: FC = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPriceCount);

  const inc = (products: ProductsType): void => {
    dispatch(incItemCount(products));
  };
  const decrement = (item: ProductsType): void => {
    dispatch(decrementItemCount(item));
    if (item.itemCount <= 1) {
      dispatch(deleteItem(item.id));
    }
  };

  return (
    <CartPage
      inc={inc}
      items={itemsInCart}
      decrement={decrement}
      totalPrice={totalPrice}
    />
  );
};
