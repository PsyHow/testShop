import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addItemInCart, fetchProductItems } from 'bll';
import { selectItems, selectItemsForProductPage } from 'selectors';
import { ProductsType } from 'types';
import { ProductPage } from 'ui';

export const ProductPageContainer: FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectItemsForProductPage);
  const itemsInCart = useSelector(selectItems);

  const addItemHandle = (item: ProductsType): void => {
    const productItems = JSON.parse(localStorage.getItem('product') || '[]');
    productItems.push(item);
    localStorage.setItem('product', JSON.stringify(productItems));
    dispatch(addItemInCart({ item }));
  };

  useEffect(() => {
    dispatch(fetchProductItems());
  }, []);

  return (
    <ProductPage
      products={products}
      itemsInCart={itemsInCart}
      addItemHandle={addItemHandle}
    />
  );
};
