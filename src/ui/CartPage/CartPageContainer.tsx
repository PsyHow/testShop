import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CartPage } from './CartPage';

import {
  incItemCount,
  deleteItem,
  decrementItemCount,
  ProductsType,
} from 'bll/cartReducer';
import { selectItems } from 'selectors/selectors';

export const CartPageContainer: FC = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectItems);

  const increaseProductQuantity = (item: ProductsType): void => {
    dispatch(incItemCount(item));
  };

  const decreaseProductQuantity = (item: ProductsType): void => {
    dispatch(decrementItemCount(item));
    if (item.itemCount <= 1) {
      dispatch(deleteItem(item.id));
    }
  };

  return (
    <CartPage
      increaseProductQuantity={increaseProductQuantity}
      items={itemsInCart}
      decreaseProductQuantity={decreaseProductQuantity}
    />
  );
};
