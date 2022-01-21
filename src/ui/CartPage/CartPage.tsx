import { FC } from 'react';

import { Grid } from '@mui/material';

import styles from './CartPage.module.scss';

import { ProductsType } from 'types';
import { CartPageItemsList, EmptyCartPage, OrderFormik } from 'ui';

type PropsType = {
  decreaseProductQuantity: (item: ProductsType) => void;
  increaseProductQuantity: (item: ProductsType) => void;
  items: ProductsType[];
};

export const CartPage: FC<PropsType> = ({
  increaseProductQuantity,
  decreaseProductQuantity,
  items,
}) => (
  <div className={styles.cartPageBox}>
    {items.length ? (
      <Grid container spacing={0} className={styles.gridContainer}>
        <CartPageItemsList
          items={items}
          inc={increaseProductQuantity}
          decrement={decreaseProductQuantity}
        />
        <OrderFormik />
      </Grid>
    ) : (
      <EmptyCartPage />
    )}
  </div>
);
