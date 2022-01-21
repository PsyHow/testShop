import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { child, get } from 'firebase/database';

import { setAppError, setAppStatus } from 'bll/appReducer/appReducer';
import { ProductsType } from 'bll/cartReducer';
import { dbRef } from 'testFirebase/base';

export const fetchProductItems = createAsyncThunk(
  'products/fetchProductsItems',
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    const res = await get(child(dbRef, `products`));
    try {
      if (res.exists()) {
        dispatch(setAppStatus({ status: 'succeeded' }));
        return { items: res.val() };
      }
      return rejectWithValue('Cannot fetch Product Items');
    } catch (error) {
      dispatch(setAppError({ error: 'Connection Error' }));
      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  } as InitialStateType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductItems.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload.items;
    });
  },
});

export const productReducer = slice.reducer;

type InitialStateType = {
  items: ProductsType[];
};
