import React, { ReactElement, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getItemsInCart, getTotalPrice } from 'bll/cartReducer';
import { PATH } from 'constants/constants';
import { selectItems, selectTotalPriceCount } from 'selectors/selectors';
import { charger, imagesRef } from "testFirebase/baseStorage";
import { CartPageContainer } from 'ui/CartPage/CartPageContainer';
import { Header } from 'ui/Header/Header';
import { ProductPageContainer } from 'ui/ProductPage/ProductPage.container';

import 'App.css';

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

  console.log(charger);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ProductPageContainer />} />
        <Route path={PATH.CART_PAGE} element={<CartPageContainer />} />
      </Routes>
    </div>
  );
};

export default App;
