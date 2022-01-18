import { FC } from 'react';

import { Grid } from '@mui/material';

import styles from './CartPage.module.scss';
import { Order } from './Order/Order';

import { ProductsType } from 'bll/cartReducer';
import { CartPageItemsList } from 'ui/CartPage/CartPageItemsList/CartPageItemsList';

type PropsType = {
  decrement: (item: ProductsType) => void;
  inc: (item: ProductsType) => void;
  items: ProductsType[];
  totalPrice: number;
};

export const CartPage: FC<PropsType> = ({ inc, decrement, items, totalPrice }) => (
  <Grid container spacing={0} className={styles.gridContainer}>
    <CartPageItemsList items={items} inc={inc} decrement={decrement} />
    <div>
      <Order />
      <div className={styles.price}>
        <b>Сумма покупок: </b>
        {totalPrice}
      </div>
    </div>
  </Grid>
);
