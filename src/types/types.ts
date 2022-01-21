export type Nullable<T> = T | null;

export type FormValuesType = {
  name: string;
  lastName: string;
  address: string;
  phone: string;
};

export type ProductsType = {
  id: number;
  name: string;
  price: number;
  photo: string;
  itemCount: number;
  totalPrice: number;
};

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
