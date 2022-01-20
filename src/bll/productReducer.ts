import { child, get } from 'firebase/database';

import { setAppError, setAppStatus } from 'bll/appReducer/appReducer';
import { ProductsType } from 'bll/cartReducer';
import { AppThunkType } from 'bll/store';
import { dbRef } from 'testFirebase/base';

const initialState = {
  products: [] as ProductsType[],
};

export const productReducer = (
  state = initialState,
  action: ProductsActionTypes,
): InitialStateType => {
  switch (action.type) {
    case 'GET_PRODUCT_ITEMS': {
      return {
        ...state,
        products: action.items,
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

// thunk
export const fetchProductItems = (): AppThunkType => dispatch => {
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

type InitialStateType = typeof initialState;

export type ProductsActionTypes = ReturnType<typeof getProductItem>;
