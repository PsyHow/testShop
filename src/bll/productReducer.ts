import Phone from '../assets/100027415722b0.jpg';
import Charger from '../assets/charger.jpg';
import Desktop from '../assets/desktop.jpg';
import Fridge from '../assets/fridge.jpg';
import Laptop from '../assets/laptop.jpg';
import Microwave from '../assets/microwave.jpg';
import Printer from '../assets/printer.jpg';
import SmartWatch from '../assets/SmartWatch.jpg';
import TV from '../assets/tv.jpg';
import Vacuum from '../assets/vacuum.jpg';

import { ProductsType } from 'bll/cartReducer';

const initialState = {
  products: [
    {
      id: 1,
      name: 'Мобильный телефон',
      price: 850,
      totalPrice: 850,
      photo: Phone,
      itemCount: 1,
    },
    {
      id: 2,
      name: 'Ноутбук',
      price: 1200,
      totalPrice: 1200,
      photo: Laptop,
      itemCount: 1,
    },
    {
      id: 3,
      name: 'Смарт-часы',
      price: 500,
      totalPrice: 500,
      photo: SmartWatch,
      itemCount: 1,
    },
    {
      id: 4,
      name: 'Принтер',
      price: 240,
      totalPrice: 240,
      photo: Printer,
      itemCount: 1,
    },
    {
      id: 5,
      name: 'Комьютер',
      price: 765,
      totalPrice: 765,
      photo: Desktop,
      itemCount: 1,
    },
    {
      id: 6,
      name: 'Зарядное устройство',
      price: 24,
      totalPrice: 24,
      photo: Charger,
      itemCount: 1,
    },
    {
      id: 7,
      name: 'Телевизор',
      price: 645,
      totalPrice: 645,
      photo: TV,
      itemCount: 1,
    },
    {
      id: 8,
      name: 'Микроволновая печь',
      price: 325,
      totalPrice: 325,
      photo: Microwave,
      itemCount: 1,
    },
    {
      id: 9,
      name: 'Холодильник',
      price: 923,
      totalPrice: 923,
      photo: Fridge,
      itemCount: 1,
    },
    {
      id: 10,
      name: 'Пылесос',
      price: 150,
      totalPrice: 150,
      photo: Vacuum,
      itemCount: 1,
    },
  ],
};

export const productReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case 'BLA_BLA': {
      return state;
    }
    default:
      return state;
  }
};

export const itemIsAdded = (item: ProductsType) =>
  ({
    type: 'ITEM_IS_ADDED',
    item,
  } as const);

type InitialStateType = typeof initialState;
