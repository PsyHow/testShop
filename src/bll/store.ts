import { combineReducers, createStore } from 'redux';

import { productReducer } from './productReducer';

import { cartReducer } from 'bll/cartReducer';

const reducers = combineReducers({
  cartReducer,
  productReducer,
});

export const store = createStore(reducers);

export type AppRootStateType = ReturnType<typeof reducers>;
