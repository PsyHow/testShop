import { FC } from 'react';

import { Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './ProductPage.module.scss';

import { ProductsType } from 'bll/cartReducer';
import { PATH } from 'constants/constants';

type PropsType = {
  products: ProductsType[];
  addItemHandle: (item: ProductsType) => void;
  itemsInCart: ProductsType[];
};

export const ProductPage: FC<PropsType> = ({ products, itemsInCart, addItemHandle }) => (
  <Grid container spacing={3} className={styles.gridContainer}>
    {products.map(item => (
      <Grid item key={item.id}>
        <Paper className={styles.paperBox}>
          <div className={styles.item} key={item.id}>
            <div>
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img className={styles.itemPhoto} alt="item Photo" src={item.photo} />
            </div>
            <b>Наименование: </b>
            <span>{item.name}</span>
            <b>Цена: </b>
            <span>{item.price} USD</span>
            <div className={styles.buttonBox}>
              {itemsInCart.find(f => f.id === item.id) ? (
                <Link className={styles.link} to={PATH.CART_PAGE}>
                  <Button variant="outlined">В корзину</Button>
                </Link>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => addItemHandle(item)}
                  type="button"
                >
                  Добавить в корзину
                </Button>
              )}
            </div>
          </div>
        </Paper>
      </Grid>
    ))}
  </Grid>
);
