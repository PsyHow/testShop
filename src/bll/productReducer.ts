import { child, get, ref, set } from 'firebase/database';
import { Dispatch } from 'redux';

import { ProductsType } from 'bll/cartReducer';
import { AppRootStateType } from 'bll/store';
import { db, dbRef } from 'testFirebase/base';
import { FormValuesType } from 'ui/CartPage/Order/OrderFormik';

const initialState = {
  products: [] as ProductsType[],
  status: 'succeeded' as RequestStatusType,
  error: null as string | null,
};

export const productReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'GET_PRODUCT_ITEMS': {
      return {
        ...state,
        products: action.items,
      };
    }
    case 'SET_APP_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'SET_APP_ERROR': {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export const getProductItem = (items: ProductsType[]) =>
  ({
    type: 'GET_PRODUCT_ITEMS',
    items,
  } as const);

export const setAppStatus = (status: RequestStatusType) =>
  ({
    type: 'SET_APP_STATUS',
    status,
  } as const);

export const setAppError = (error: string | null) =>
  ({
    type: 'SET_APP_ERROR',
    error,
  } as const);

// thunk
export const fetchProductItems = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  get(child(dbRef, `products`))
    .then(snapshot => {
      if (snapshot.exists()) {
        dispatch(setAppStatus('succeeded'));
        dispatch(getProductItem(snapshot.val()));
      }
    })
    .catch(() => {
      dispatch(setAppError('Connection Error'));
    });
};

export const setOrderTC =
  (data: FormValuesType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const { items } = state.cartReducer;
    dispatch(setAppStatus('loading'));
    set(ref(db, 'order/'), { data, items })
      .then(() => {
        dispatch(setAppStatus('succeeded'));
        dispatch(setAppError('Data saved successfully!'));
      })
      .catch(() => {
        dispatch(setAppError('Connection Error'));
      });
  };

type InitialStateType = typeof initialState;

type ActionsType =
  | ReturnType<typeof getProductItem>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
