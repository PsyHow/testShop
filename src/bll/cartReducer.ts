import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ref, set } from 'firebase/database';
import { Dispatch } from 'redux';

import { setAppError, setAppStatus } from 'bll/appReducer/appReducer';
import { AppRootStateType } from 'bll/store';
import { db } from 'testFirebase/base';
import { FormValuesType } from 'ui/CartPage/Order/OrderFormik';

const initialState: InitialStateType = {
  items: [],
  itemCount: 0,
  totalPriceCount: 0,
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incItemCount(state, action: PayloadAction<{ item: ProductsType }>) {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.item.id
            ? {
                ...item,
                itemCount: action.payload.item.itemCount + 1,
                totalPrice: action.payload.item.totalPrice + item.price,
              }
            : item,
        ),
        totalPriceCount: state.totalPriceCount + action.payload.item.price,
      };
    },
    decrementItemCount(state, action: PayloadAction<{ item: ProductsType }>) {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.item.id
            ? {
                ...item,
                itemCount: action.payload.item.itemCount - 1,
                totalPrice: action.payload.item.totalPrice - item.price,
              }
            : item,
        ),
        totalPriceCount: state.totalPriceCount - action.payload.item.price,
      };
    },
    addItemInCart(state, action: PayloadAction<{ item: ProductsType }>) {
      return {
        ...state,
        items: [...state.items, action.payload.item],
        totalPriceCount: state.totalPriceCount + action.payload.item.price,
      };
    },
    deleteItem(state, action: PayloadAction<{ id: number }>) {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    },
    getItemsInCart(state, action: PayloadAction<{ items: ProductsType[] }>) {
      return {
        ...state,
        items: action.payload.items,
      };
    },
    getTotalPrice(state, action: PayloadAction<{ totalPrice: number }>) {
      return {
        ...state,
        totalPriceCount: state.items.reduce((acc, item) => acc + item.totalPrice, 0),
      };
    },
  },
});

export const cartReducer = slice.reducer;
export const {
  decrementItemCount,
  deleteItem,
  getItemsInCart,
  incItemCount,
  addItemInCart,
  getTotalPrice,
} = slice.actions;

export const setOrderTC =
  (data: FormValuesType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const { items } = getState().cartReducer;
    dispatch(setAppStatus({ status: 'loading' }));
    set(ref(db, 'order/'), { data, items })
      .then(() => {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(getItemsInCart({ items: [] }));
        dispatch(getTotalPrice({ totalPrice: 0 }));
      })
      .catch(() => {
        dispatch(setAppError({ error: 'Connection Error' }));
      });
  };

export type InitialStateType = {
  items: ProductsType[];
  itemCount: number;
  totalPriceCount: number;
};

export type ProductsType = {
  id: number;
  name: string;
  price: number;
  photo: string;
  itemCount: number;
  totalPrice: number;
};
