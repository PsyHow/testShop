import React, { ReactElement, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getItemsInCart, getTotalPrice } from 'bll/cartReducer';
import { selectItems, selectTotalPriceCount } from 'selectors/selectors';
import { CartPageContainer } from 'ui/CartPage/CartPageContainer';
import { Header } from 'ui/Header/Header';
import { ProductPage } from 'ui/ProductPage/ProductPage';

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectTotalPriceCount);
  const itemsInCart = useSelector(selectItems);
  useEffect(() => {
    const valueAsString = localStorage.getItem('product');
    if (valueAsString) {
      const itemsLocal = JSON.parse(valueAsString);
      dispatch(getItemsInCart(itemsLocal));
      dispatch(getTotalPrice(totalPrice));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(itemsInCart));
  }, [itemsInCart]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="cartPage" element={<CartPageContainer />} />
      </Routes>
    </>
  );
};

export default App;
