import { FC } from 'react';

import { Paper } from '@mui/material';

import styles from './CartPageItemsList.module.scss';

import { ProductsType } from 'bll/cartReducer';

type PropsType = {
  items: ProductsType[];
  decrement: (item: ProductsType) => void;
  inc: (item: ProductsType) => void;
};

export const CartPageItemsList: FC<PropsType> = ({ inc, items, decrement }) => (
  <div className={styles.itemsBox}>
    {items.map(item => (
      <Paper key={item.id} className={styles.paperItem}>
        <div>
          <img alt="item-iso" src={item.photo} className={styles.img} />
        </div>
        <div className={styles.description}>
          <b>Наименование</b>
          <span>{item.name}</span>
          <b>Цена</b>
          <span>{item.totalPrice}</span>
          <div className={styles.buttons}>
            <button type="button" onClick={() => decrement(item)}>
              -
            </button>{' '}
            {item.itemCount}
            <button type="button" onClick={() => inc(item)}>
              +
            </button>
          </div>
        </div>
      </Paper>
    ))}
  </div>
);
