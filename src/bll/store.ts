import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from './appReducer/appReducer';
import { productReducer } from './productReducer';

import { cartReducer } from 'bll/cartReducer';

const rootReducer = combineReducers({
  cartReducer,
  productReducer,
  appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;
