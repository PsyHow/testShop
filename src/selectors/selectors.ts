import { AppRootStateType } from 'bll';
import { Nullable, ProductsType, RequestStatusType } from 'types';

export const selectItems = (state: AppRootStateType): ProductsType[] =>
  state.cartReducer.items;
export const selectTotalPriceCount = (state: AppRootStateType): number =>
  state.cartReducer.totalPriceCount;
export const selectItemsForProductPage = (state: AppRootStateType): ProductsType[] =>
  state.productReducer.items;
export const selectAppStatus = (state: AppRootStateType): RequestStatusType =>
  state.appReducer.status;
export const selectError = (state: AppRootStateType): Nullable<string> =>
  state.appReducer.error;
