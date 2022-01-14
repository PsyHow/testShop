import { FC } from 'react';

import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import { PATH } from 'constants/constants';

export const Header: FC = () => (
  <div className={styles.header}>
    <Link to={PATH.CART_PAGE}>CART</Link>
    <Link to={PATH.PRODUCT_PAGE}>Main</Link>
  </div>
);
