import { FC } from 'react';

import { ProductsType } from 'bll/cartReducer';
import styles from 'ui/CartPage/CartPage.module.scss';

export const CartPage: FC<PropsType> = ({ inc, decrement, items }) => (
  <div className={styles.itemsBox}>
    {items.map(item => (
      <div key={item.id} className={styles.item}>
        <b>Наименование</b>
        <div>{item.name}</div>
        <b>Цена</b>
        <div>{item.totalPrice}</div>
        <button type="button" onClick={() => decrement(item)}>
          -
        </button>{' '}
        {item.itemCount}
        <button type="button" onClick={() => inc(item)}>
          +
        </button>
      </div>
    ))}
  </div>
);

type PropsType = {
  decrement: (item: ProductsType) => void;
  inc: (item: ProductsType) => void;
  items: ProductsType[];
};
