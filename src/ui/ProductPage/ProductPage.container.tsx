import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addItemInCart, ProductsType } from 'bll/cartReducer';
import { itemIsAdded } from 'bll/productReducer';
import { selectItems, selectItemsForProductPage } from 'selectors/selectors';
import { ProductPage } from 'ui/ProductPage/ProductPage';

export const ProductPageContainer: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectItemsForProductPage);
  const itemsInCart = useSelector(selectItems);

  const addItemHandle = (item: ProductsType): void => {
    const productItems = JSON.parse(localStorage.getItem('product') || '[]');
    productItems.push(item);
    localStorage.setItem('product', JSON.stringify(productItems));
    dispatch(addItemInCart(item));
    dispatch(itemIsAdded(item));
  };

  return (
    <ProductPage
      products={products}
      itemsInCart={itemsInCart}
      addItemHandle={addItemHandle}
    />
  );
};