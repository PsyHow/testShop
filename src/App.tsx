import React, { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { CartPageContainer } from 'ui/CartPage/CartPageContainer';
import { Header } from 'ui/Header/Header';
import { ProductPage } from 'ui/ProductPage/ProductPage';

const App = (): ReactElement => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="cartPage" element={<CartPageContainer />} />
    </Routes>
  </>
);

export default App;
