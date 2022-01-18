import { FC } from 'react';

import { Grid } from '@mui/material';

import styles from './CartPage.module.scss';
import { Order } from './Order/Order';

import { ProductsType } from 'bll/cartReducer';
import { CartPageItemsList } from 'ui/CartPage/CartPageItemsList/CartPageItemsList';

type PropsType = {
  decreaseProductQuantity: (item: ProductsType) => void;
  increaseProductQuantity: (item: ProductsType) => void;
  items: ProductsType[];
  totalPrice: number;
};

export const CartPage: FC<PropsType> = ({
  increaseProductQuantity,
  decreaseProductQuantity,
  items,
  totalPrice,
}) => (
  <Grid container spacing={0} className={styles.gridContainer}>
    <CartPageItemsList
      items={items}
      inc={increaseProductQuantity}
      decrement={decreaseProductQuantity}
    />
    <div>
      <Order />
      <div className={styles.price}>
        <b>Сумма покупок: </b>
        {totalPrice}
      </div>
    </div>
  </Grid>
);
