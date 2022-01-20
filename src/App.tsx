import React, { ReactElement, useEffect } from 'react';

import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getItemsInCart, getTotalPrice } from 'bll/cartReducer';
import { PATH } from 'constants/constants';
import { selectAppStatus, selectItems, selectTotalPriceCount } from 'selectors/selectors';
import { CartPageContainer } from 'ui/CartPage/CartPageContainer';
import { ErrorSnackbar } from 'ui/common/ErrorSnackBar';
import { Header } from 'ui/Header/Header';
import { ProductPageContainer } from 'ui/ProductPage/ProductPageContainer';
import 'App.css';

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectTotalPriceCount);
  const status = useSelector(selectAppStatus);
  const itemsInCart = useSelector(selectItems);

  useEffect(() => {
    const valueAsString = localStorage.getItem('product');
    if (valueAsString) {
      const itemsLocal = JSON.parse(valueAsString);
      dispatch(getItemsInCart({ items: itemsLocal }));
      dispatch(getTotalPrice({ totalPrice }));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(itemsInCart));
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
