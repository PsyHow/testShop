import { FC } from 'react';

import { Grid } from '@mui/material';

import styles from './CartPage.module.scss';

import { ProductsType } from 'bll/cartReducer';
import { CartPageItemsList } from 'ui/CartPage/CartPageItemsList/CartPageItemsList';
import { EmptyCartPage } from 'ui/CartPage/EmptyCartPage/EmptyCartPage';
import { OrderFormik } from 'ui/CartPage/Order/OrderFormik';

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
  <div style={{ minHeight: '100vh' }}>
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
