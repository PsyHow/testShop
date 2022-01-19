import { ProductsType } from 'bll/cartReducer';
import { RequestStatusType } from 'bll/productReducer';
import { AppRootStateType } from 'bll/store';

export const selectItems = (state: AppRootStateType): ProductsType[] =>
  state.cartReducer.items;
export const selectTotalPriceCount = (state: AppRootStateType): number =>
  state.cartReducer.totalPriceCount;
export const selectItemsForProductPage = (state: AppRootStateType): ProductsType[] =>
  state.productReducer.products;
export const selectAppStatus = (state: AppRootStateType): RequestStatusType =>
  state.productReducer.status;
export const selectError = (state: AppRootStateType): string | null =>
  state.productReducer.error;
