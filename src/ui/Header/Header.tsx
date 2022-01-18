import { FC } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import { PATH } from 'constants/constants';
import { selectTotalPriceCount } from 'selectors/selectors';

export const Header: FC = () => {
  const totalPrice = useSelector(selectTotalPriceCount);

  return (
    <div className={styles.header}>
      <Link to={PATH.CART_PAGE}>CART</Link>
      <Link to={PATH.PRODUCT_PAGE}>Main</Link>
      {totalPrice ? (
        <div>
          <b>Total Price: </b>
          {totalPrice}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
