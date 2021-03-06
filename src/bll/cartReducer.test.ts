import {
  addItemInCart,
  decrementItemCount,
  deleteItem,
  getItemsInCart,
  getTotalPrice,
  incItemCount,
  InitialStateType,
} from 'bll';
import { cartReducer } from 'bll/cartReducer';

let startState: InitialStateType = {
  items: [],
  itemCount: 0,
  totalPriceCount: 0,
};
beforeEach(() => {
  startState = {
    items: [
      {
        id: 1,
        name: 'Мобильный телефон',
        price: 850,
        totalPrice: 850,
        photo: 'add url',
        itemCount: 1,
      },
      {
        id: 2,
        name: 'Ноутбук',
        price: 1200,
        totalPrice: 1200,
        photo: 'add url',
        itemCount: 1,
      },
    ],
    itemCount: 0,
    totalPriceCount: 2050,
  };
});

test('item should be remove', () => {
  const action = deleteItem({ id: 1 });

  const endState = cartReducer(startState, action);

  expect(endState.items.length).toBe(1);
  expect(endState.items.every(item => item.id !== 1)).toBeTruthy();
});

test('total price should be correct', () => {
  const action = getTotalPrice();

  const endState = cartReducer(startState, action);

  expect(endState.totalPriceCount).toBe(2050);
});

test('item should be added', () => {
  const action = addItemInCart({
    item: {
      id: 3,
      name: 'Наушники',
      price: 230,
      totalPrice: 230,
      photo: 'add url',
      itemCount: 1,
    },
  });

  const endState = cartReducer(startState, action);

  expect(endState.items.length).toBe(3);
  expect(endState.items[2].id).toBe(3);
  expect(endState.items[2].name).toBe('Наушники');
  expect(endState.totalPriceCount).toBe(2280);
});

test('increment item count should be correct', () => {
  const action = incItemCount({ item: startState.items[0] });

  const endState = cartReducer(startState, action);

  expect(endState.items[0].itemCount).toBe(2);
  expect(endState.items[0].totalPrice).toBe(1700);
  expect(endState.items[1].itemCount).toBe(1);
  expect(endState.items[1].totalPrice).toBe(1200);
  expect(endState.totalPriceCount).toBe(2900);
});

test('decrement item count should be correct', () => {
  const action = decrementItemCount({ item: startState.items[0] });

  const endState = cartReducer(startState, action);

  expect(endState.items[0].itemCount).toBe(0);
  expect(endState.items[0].totalPrice).toBe(0);
  expect(endState.items[1].itemCount).toBe(1);
  expect(endState.items[1].totalPrice).toBe(1200);
  expect(endState.items[0].totalPrice).toBe(0);
});

test('items should be get', () => {
  const item = {
    id: 1,
    name: 'Phone',
    itemCount: 4,
    photo: '',
    price: 100,
    totalPrice: 400,
  };
  const items = JSON.parse(localStorage.getItem('items') || '[]');
  items.push(item);
  localStorage.setItem('product', JSON.stringify(items));

  const action = getItemsInCart({ items });

  const endState = cartReducer(startState, action);

  expect(endState.items[0].name).toBe('Phone');
  expect(endState.items.length).toBe(1);
});
