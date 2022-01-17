import { ProductsType } from 'bll/cartReducer';
import { AppRootStateType } from 'bll/store';

export const selectItems = (state: AppRootStateType): ProductsType[] =>
  state.cartReducer.items;
export const selectTotalPriceCount = (state: AppRootStateType): number =>
  state.cartReducer.totalPriceCount;
