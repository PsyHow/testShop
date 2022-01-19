import { child, get } from 'firebase/database';
import { Dispatch } from 'redux';

import { ProductsType } from 'bll/cartReducer';
import { dbRef } from 'testFirebase/base';

const initialState = {
  products: [] as ProductsType[],
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
export const fetchProductItems = () => (dispatch: Dispatch) => {
  get(child(dbRef, `products`))
    .then(snapshot => {
      if (snapshot.exists()) {
        dispatch(getProductItem(snapshot.val()));
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
};

type InitialStateType = typeof initialState;

type ActionsType = ReturnType<typeof getProductItem>;
