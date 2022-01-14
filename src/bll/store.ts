import { combineReducers, createStore } from 'redux';

import { cartReducer } from 'bll/cartReducer';

const reducers = combineReducers({
  cartReducer,
});

export const store = createStore(reducers);

export type AppRootStateType = ReturnType<typeof reducers>;
