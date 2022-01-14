import React, { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { ProductsType } from 'bll/cartReducer';
import { CartPageContainer } from 'ui/CartPage/CartPageContainer';
import { Header } from 'ui/Header/Header';
import { ProductPage } from 'ui/ProductPage/ProductPage';

export const products: ProductsType[] = [
  {
    id: 1,
    name: 'Мобильный телефон',
    price: 850,
    totalPrice: 850,
    photo: 'add url',
    itemCount: 1,
  },
  {
    id: 2,
    name: 'Ноутбук',
    price: 1200,
    totalPrice: 1200,
    photo: 'add url',
    itemCount: 1,
  },
  {
    id: 3,
    name: 'Смарт-часы',
    price: 500,
    totalPrice: 500,
    photo: 'add url',
    itemCount: 1,
  },
  { id: 4, name: 'Принтер', price: 240, totalPrice: 240, photo: 'add url', itemCount: 1 },
  {
    id: 5,
    name: 'Комьютер',
    price: 765,
    totalPrice: 765,
    photo: 'add url',
    itemCount: 1,
  },
  {
    id: 6,
    name: 'Зарядное устройство',
    photo: 'add url',
    price: 24,
    totalPrice: 24,
    itemCount: 1,
  },
  {
    id: 7,
    name: 'Телевизор',
    price: 645,
    totalPrice: 645,
    photo: 'add url',
    itemCount: 1,
  },
  {
    id: 8,
    name: 'Микроволновая печь',
    price: 325,
    totalPrice: 325,
    photo: 'add url',
    itemCount: 1,
  },
  {
    id: 9,
    name: 'Холодильник',
    price: 923,
    totalPrice: 923,
    photo: 'add url',
    itemCount: 1,
  },
  {
    id: 10,
    name: 'Пылесос',
    price: 150,
    totalPrice: 150,
    photo: 'add url',
    itemCount: 1,
  },
];

const App = (): ReactElement => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<ProductPage products={products} />} />
      <Route path="cartPage" element={<CartPageContainer />} />
    </Routes>
  </>
);

export default App;
