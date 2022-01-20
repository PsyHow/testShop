import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { AppActionTypes, appReducer } from './appReducer/appReducer';
import { productReducer, ProductsActionTypes } from './productReducer';

import { CartActionTypes, cartReducer } from 'bll/cartReducer';

const reducers = combineReducers({
  cartReducer,
  productReducer,
  appReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>;

type ReducersActionTypes = AppActionTypes | ProductsActionTypes | CartActionTypes;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ReducersActionTypes
>;
