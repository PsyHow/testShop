import { RequestStatusType } from 'bll/appReducer/appReducer';
import { ProductsType } from 'bll/cartReducer';
import { AppRootStateType } from 'bll/store';

export const selectItems = (state: AppRootStateType): ProductsType[] =>
  state.cartReducer.items;
export const selectTotalPriceCount = (state: AppRootStateType): number =>
  state.cartReducer.totalPriceCount;
export const selectItemsForProductPage = (state: AppRootStateType): ProductsType[] =>
  state.productReducer;
export const selectAppStatus = (state: AppRootStateType): RequestStatusType =>
  state.appReducer.status;
export const selectError = (state: AppRootStateType): string | null =>
  state.appReducer.error;
