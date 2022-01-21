import { FC } from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './EmptyCartPage.module.scss';

import { PATH } from 'const';

export const EmptyCartPage: FC = () => (
  <div className={styles.cartBox}>
    <h1>Ваша корзина пустая!</h1>
    <h3> Вы можете выбрать товар</h3>
    <Link to={PATH.PRODUCT_PAGE}>
      <Button variant="contained">нажав на кнопку</Button>
    </Link>
  </div>
);
