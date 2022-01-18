import { FC } from 'react';

import { Grid, Paper } from '@mui/material';

import { ProductsType } from 'bll/cartReducer';
import styles from 'ui/CartPage/CartPage.module.scss';

type PropsType = {
  decrement: (item: ProductsType) => void;
  inc: (item: ProductsType) => void;
  items: ProductsType[];
};

export const CartPage: FC<PropsType> = ({ inc, decrement, items }) => (
  <Grid container spacing={3} className={styles.itemsBox}>
    {/* <div className={styles.itemsBox}> */}
    {items.map(item => (
      <Grid item key={item.id}>
        <Paper>
          <div key={item.id} className={styles.item}>
            <img className={styles.img} alt="item-iso" src={item.photo} />
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
          </div>
        </Paper>
      </Grid>
    ))}
    {/* </div> */}
  </Grid>
);
