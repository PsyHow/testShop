const initialState = {
  items: [] as ProductsType[],
  itemCount: 0,
  totalPriceCount: 0,
};

export const cartReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'INC_ITEM_COUNT': {
      return {
        ...state,
        items: state.items.map(m =>
          m.id === action.item.id
            ? {
                ...m,
                itemCount: action.item.itemCount + 1,
                totalPrice: action.item.totalPrice + m.price,
              }
            : m,
        ),
        totalPriceCount: state.totalPriceCount + action.item.price,
      };
    }
    case 'DECREMENT_ITEM_COUNT': {
      return {
        ...state,
        items: state.items.map(m =>
          m.id === action.item.id
            ? {
                ...m,
                itemCount: action.item.itemCount - 1,
                totalPrice: action.item.totalPrice - m.price,
              }
            : m,
        ),
        totalPriceCount: state.totalPriceCount - action.item.price,
      };
    }
    case 'ADD_ITEM_IN_CART': {
      return {
        ...state,
        items: [...state.items, action.item],
        totalPriceCount: state.totalPriceCount + action.item.price,
      };
    }
    case 'DELETE_ITEM': {
      return {
        ...state,
        items: state.items.filter(f => f.id !== action.id),
      };
    }
    case 'GET_ITEMS_IN_CART': {
      return {
        ...state,
        items: action.items,
      };
    }
    case 'GET_TOTAL_PRICE': {
      return {
        ...state,
        totalPriceCount: state.items.reduce((acc, item) => acc + item.totalPrice, 0),
      };
    }
    default:
      return state;
  }
};

// actions
export const incItemCount = (item: ProductsType) =>
  ({
    type: 'INC_ITEM_COUNT',
    item,
  } as const);

export const decrementItemCount = (item: ProductsType) =>
  ({
    type: 'DECREMENT_ITEM_COUNT',
    item,
  } as const);

export const addItemInCart = (item: ProductsType) =>
  ({
    type: 'ADD_ITEM_IN_CART',
    item,
  } as const);

export const deleteItem = (id: number) =>
  ({
    type: 'DELETE_ITEM',
    id,
  } as const);

export const getItemsInCart = (items: ProductsType[]) =>
  ({
    type: 'GET_ITEMS_IN_CART',
    items,
  } as const);

export const getTotalPrice = (totalPrice: number) =>
  ({
    type: 'GET_TOTAL_PRICE',
    totalPrice,
  } as const);

export type ProductsType = {
  id: number;
  name: string;
  price: number;
  photo: string;
  itemCount: number;
  totalPrice: number;
};

export type InitialStateType = typeof initialState;

export type ActionsType =
  | ReturnType<typeof incItemCount>
  | ReturnType<typeof addItemInCart>
  | ReturnType<typeof decrementItemCount>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof getItemsInCart>
  | ReturnType<typeof getTotalPrice>;
