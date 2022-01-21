import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { incItemCount, deleteItem, decrementItemCount } from 'bll';
import { selectItems } from 'selectors';
import { ProductsType } from 'types';
import { CartPage } from 'ui';

export const CartPageContainer: FC = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectItems);

  const increaseProductQuantity = (item: ProductsType): void => {
    dispatch(incItemCount({ item }));
  };

  const decreaseProductQuantity = (item: ProductsType): void => {
    dispatch(decrementItemCount({ item }));
    if (item.itemCount <= 1) {
      dispatch(deleteItem({ id: item.id }));
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
