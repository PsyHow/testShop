import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { productReducer } from './productReducer';

import { cartReducer } from 'bll/cartReducer';

const reducers = combineReducers({
  cartReducer,
  productReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>;
