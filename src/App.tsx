import React, { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { ProductsType } from 'bll/cartReducer';
import { CartPage } from 'ui/CartPage/CartPage';
import { Header } from 'ui/Header/Header';
import { ProductPage } from 'ui/ProductPage/ProductPage';

export const products: ProductsType[] = [
  { id: 1, name: 'Мобильный телефон', price: 850, photo: 'add url', isAvailable: true },
  { id: 2, name: 'Ноутбук', price: 1200, photo: 'add url', isAvailable: true },
  { id: 3, name: 'Смарт-часы', price: 500, photo: 'add url', isAvailable: true },
  { id: 4, name: 'Принтер', price: 240, photo: 'add url', isAvailable: true },
  { id: 5, name: 'Комьютер', price: 765, photo: 'add url', isAvailable: true },
  { id: 6, name: 'Зарядное устройство', photo: 'add url', price: 24, isAvailable: true },
  { id: 7, name: 'Телевизор', price: 645, photo: 'add url', isAvailable: true },
  { id: 8, name: 'Микроволновая печь', price: 325, photo: 'add url', isAvailable: true },
  { id: 9, name: 'Холодильник', price: 923, photo: 'add url', isAvailable: true },
  { id: 10, name: 'Пылесос', price: 150, photo: 'add url', isAvailable: true },
];

const App = (): ReactElement => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<ProductPage products={products} />} />
      <Route path="cartPage" element={<CartPage />} />
    </Routes>
  </>
);

export default App;
