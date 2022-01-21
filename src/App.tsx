import React, { ReactElement, useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getItemsInCart, getTotalPrice } from 'bll';
import { PATH } from 'const';
import { selectAppStatus, selectItems } from 'selectors';
import { CartPageContainer, ErrorSnackbar, Header, ProductPageContainer } from 'ui';

import 'App.css';

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const status = useSelector(selectAppStatus);
  const itemsInCart = useSelector(selectItems);

  useEffect(() => {
    const valueAsString = localStorage.getItem('product');
    if (valueAsString) {
      const itemsLocal = JSON.parse(valueAsString);
      dispatch(getItemsInCart({ items: itemsLocal }));
      dispatch(getTotalPrice());
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(itemsInCart));
    dispatch(getTotalPrice());
  }, [itemsInCart]);

  return (
    <div className="app">
      <ErrorSnackbar />
      <Header />
      {status === 'loading' && <LinearProgress />}
      <Routes>
        <Route path="/" element={<ProductPageContainer />} />
        <Route path={PATH.CART_PAGE} element={<CartPageContainer />} />
      </Routes>
    </div>
  );
};

export default App;
