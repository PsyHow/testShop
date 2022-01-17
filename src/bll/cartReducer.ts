const initialState = {
  items: [
    {
      id: 1,
      name: 'Мобильный телефон',
      price: 850,
      totalPrice: 850,
      photo: 'add url',
      itemCount: 1,
      isAdded: false,
    },
    {
      id: 2,
      name: 'Ноутбук',
      price: 1200,
      totalPrice: 1200,
      photo: 'add url',
      itemCount: 1,
      isAdded: false,
    },
    {
      id: 3,
      name: 'Смарт-часы',
      price: 500,
      totalPrice: 500,
      photo: 'add url',
      itemCount: 1,
      isAdded: false,
    },
  ] as ProductsType[],
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
        items: state.items.map(item =>
          item.id === action.item.id
            ? {
                ...item,
                itemCount: action.item.itemCount + 1,
                totalPrice: action.item.totalPrice + item.price,
              }
            : item,
        ),
        totalPriceCount: state.totalPriceCount + action.item.price,
      };
    }
    case 'DECREMENT_ITEM_COUNT': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.item.id
            ? {
                ...item,
                itemCount: action.item.itemCount - 1,
                totalPrice: action.item.totalPrice - item.price,
              }
            : item,
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
        items: state.items.filter(item => item.id !== action.id),
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
  isAdded: boolean;
};

export type InitialStateType = typeof initialState;

export type ActionsType =
  | ReturnType<typeof incItemCount>
  | ReturnType<typeof addItemInCart>
  | ReturnType<typeof decrementItemCount>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof getItemsInCart>
  | ReturnType<typeof getTotalPrice>;
