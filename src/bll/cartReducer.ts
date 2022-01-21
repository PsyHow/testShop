import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ref, set } from 'firebase/database';

import { setAppError, setAppStatus, AppRootStateType } from 'bll';
import { db } from 'testFirebase';
import { FormValuesType, ProductsType } from 'types';

export const setOrderTC = createAsyncThunk(
  'cart/setOrder',
  async (data: FormValuesType, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as AppRootStateType;
    const { items } = state.cartReducer;
    dispatch(setAppStatus({ status: 'loading' }));
    await set(ref(db, 'order/'), { data, items });
    try {
      dispatch(setAppStatus({ status: 'succeeded' }));
      return { items: [] };
    } catch (e) {
      dispatch(setAppError({ error: 'Connection Error' }));
      return rejectWithValue(null);
    }
  },
);

const slice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    itemCount: 0,
    totalPriceCount: 0,
  } as InitialStateType,
  reducers: {
    incItemCount(state, action: PayloadAction<{ item: ProductsType }>) {
      const index = state.items.findIndex(item => item.id === action.payload.item.id);
      if (index > -1) {
        state.items[index].itemCount = action.payload.item.itemCount + 1;
        state.items[index].totalPrice =
          state.items[index].price + action.payload.item.totalPrice;
      }
      state.totalPriceCount += action.payload.item.price;
    },
    decrementItemCount(state, action: PayloadAction<{ item: ProductsType }>) {
      const index = state.items.findIndex(item => item.id === action.payload.item.id);
      if (index > -1) {
        state.items[index].itemCount = action.payload.item.itemCount - 1;
        state.items[index].totalPrice =
          action.payload.item.totalPrice - state.items[index].price;
      }
      state.totalPriceCount -= action.payload.item.price;
    },
    addItemInCart(state, action: PayloadAction<{ item: ProductsType }>) {
      state.items.push(action.payload.item);
      state.totalPriceCount += action.payload.item.price;
    },
    deleteItem(state, action: PayloadAction<{ id: number }>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index > -1) {
        state.items.splice(index, 1);
      }
    },
    getItemsInCart(state, action: PayloadAction<{ items: ProductsType[] }>) {
      state.items = action.payload.items;
    },
    getTotalPrice(state) {
      state.totalPriceCount = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
    },
  },
  extraReducers: builder => {
    builder.addCase(setOrderTC.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
  },
});

export const cartReducer = slice.reducer;
export const {
  decrementItemCount,
  deleteItem,
  incItemCount,
  addItemInCart,
  getTotalPrice,
  getItemsInCart,
} = slice.actions;

export type InitialStateType = {
  items: ProductsType[];
  itemCount: number;
  totalPriceCount: number;
};
