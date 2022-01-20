import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { child, get } from 'firebase/database';
import { Dispatch } from 'redux';

import { setAppError, setAppStatus } from 'bll/appReducer/appReducer';
import { ProductsType } from 'bll/cartReducer';
import { dbRef } from 'testFirebase/base';

const slice = createSlice({
  name: 'products',
  initialState: [] as InitialStateType,
  reducers: {
    getProductItems(state, action: PayloadAction<{ items: ProductsType[] }>) {
      return action.payload.items.map(products => ({ ...products }));
    },
  },
});

export const { getProductItems } = slice.actions;
export const productReducer = slice.reducer;

// thunk
export const fetchProductItems = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  get(child(dbRef, `products`))
    .then(snapshot => {
      if (snapshot.exists()) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        dispatch(getProductItems({ items: snapshot.val() }));
      }
    })
    .catch(() => {
      dispatch(setAppError({ error: 'Connection Error' }));
    });
};

type InitialStateType = ProductsType[];
