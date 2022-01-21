import { FC } from 'react';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { AppBar, Button, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import { PATH } from 'const';
import { selectTotalPriceCount } from 'selectors';

export const Header: FC = () => {
  const totalPrice = useSelector(selectTotalPriceCount);

  return (
    <AppBar position="static">
      <Toolbar className={styles.headerBox}>
        <div>
          <Link to={PATH.PRODUCT_PAGE}>
            <Button color="inherit">Список товаров</Button>
          </Link>
        </div>
        {totalPrice ? (
          <div className={styles.cartBox}>
            <div>
              <b>Сумма покупок: </b> {totalPrice}
            </div>
            <div>
              <Link to={PATH.CART_PAGE}>
                <LocalMallIcon fontSize="large" />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Link to={PATH.CART_PAGE}>
              <LocalMallOutlinedIcon fontSize="large" />
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
