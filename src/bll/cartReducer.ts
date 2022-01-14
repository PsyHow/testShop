const initialState = {
  items: [] as ProductsType[],
  itemCount: 1,
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
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        itemCount: state.itemCount + 1,
      };
    }
    case 'ADD_ITEM_IN_CART': {
      return {
        ...state,
        items: [...state.items, action.item],
        totalPriceCount: state.totalPriceCount + action.item.price,
      };
    }
    default:
      return state;
  }
};

// actions
export const incItemCount = () =>
  ({
    type: 'INC_ITEM_COUNT',
  } as const);

export const addItemInCart = (item: ProductsType) =>
  ({
    type: 'ADD_ITEM_IN_CART',
    item,
  } as const);

export type ProductsType = {
  id: number;
  name: string;
  price: number;
  photo: string;
  isAvailable: boolean;
};

export type InitialStateType = typeof initialState;

export type ActionsType =
  | ReturnType<typeof incItemCount>
  | ReturnType<typeof addItemInCart>;
