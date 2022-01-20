import { ref, set } from 'firebase/database';
import { Dispatch } from 'redux';

import { setAppError, setAppStatus } from 'bll/appReducer/appReducer';
import { AppRootStateType } from 'bll/store';
import { db } from 'testFirebase/base';
import { FormValuesType } from 'ui/CartPage/Order/OrderFormik';

const initialState = {
  items: [] as ProductsType[],
  itemCount: 0,
  totalPriceCount: 0,
};

export const cartReducer = (
  state = initialState,
  action: CartActionTypes,
): InitialStateType => {
  switch (action.type) {
    case 'INC_ITEM_COUNT': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.item.id
            ? {
                ...item,
                itemCount: action.item.itemCount + 1,
                totalPrice: action.item.totalPrice + item.price,
              }
            : item,
        ),
        totalPriceCount: state.totalPriceCount + action.item.price,
      };
    }
    case 'DECREMENT_ITEM_COUNT': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.item.id
            ? {
                ...item,
                itemCount: action.item.itemCount - 1,
                totalPrice: action.item.totalPrice - item.price,
              }
            : item,
        ),
        totalPriceCount: state.totalPriceCount - action.item.price,
      };
    }
    case 'ADD_ITEM_IN_CART': {
      return {
        ...state,
        items: [...state.items, action.item],
        totalPriceCount: state.totalPriceCount + action.item.price,
      };
    }
    case 'DELETE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    }
    case 'GET_ITEMS_IN_CART': {
      return {
        ...state,
        items: action.items,
      };
    }
    case 'GET_TOTAL_PRICE': {
      return {
        ...state,
        totalPriceCount: state.items.reduce((acc, item) => acc + item.totalPrice, 0),
      };
    }
    default:
      return state;
  }
};

// actions
export const incItemCount = (item: ProductsType) =>
  ({
    type: 'INC_ITEM_COUNT',
    item,
  } as const);

export const decrementItemCount = (item: ProductsType) =>
  ({
    type: 'DECREMENT_ITEM_COUNT',
    item,
  } as const);

export const addItemInCart = (item: ProductsType) =>
  ({
    type: 'ADD_ITEM_IN_CART',
    item,
  } as const);

export const deleteItem = (id: number) =>
  ({
    type: 'DELETE_ITEM',
    id,
  } as const);

export const getItemsInCart = (items: ProductsType[]) =>
  ({
    type: 'GET_ITEMS_IN_CART',
    items,
  } as const);

export const getTotalPrice = (totalPrice: number) =>
  ({
    type: 'GET_TOTAL_PRICE',
    totalPrice,
  } as const);

export const setOrderTC =
  (data: FormValuesType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const { items } = getState().cartReducer;
    dispatch(setAppStatus({ status: 'loading' }));
    set(ref(db, 'order/'), { data, items })
      .then(() => {
        dispatch(setAppStatus({ status: 'succeeded' }));
      })
      .catch(() => {
        dispatch(setAppError({ error: 'Connection Error' }));
      });
  };

export type ProductsType = {
  id: number;
  name: string;
  price: number;
  photo: string;
  itemCount: number;
  totalPrice: number;
};

export type InitialStateType = typeof initialState;

export type CartActionTypes =
  | ReturnType<typeof incItemCount>
  | ReturnType<typeof addItemInCart>
  | ReturnType<typeof decrementItemCount>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof getItemsInCart>
  | ReturnType<typeof getTotalPrice>;
