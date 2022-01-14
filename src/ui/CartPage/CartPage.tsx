import { FC } from 'react';

import { useSelector } from 'react-redux';

import styles from './CartPage.module.scss';

import { ProductsType } from 'bll/cartReducer';
import { AppRootStateType } from 'bll/store';

export const CartPage: FC = () => {
  const items = useSelector<AppRootStateType, ProductsType[]>(st => st.cartReducer.items);
  const totalPrice = useSelector<AppRootStateType, number>(
    st => st.cartReducer.totalPriceCount,
  );
  return (
    <div className={styles.cartBox}>
      <div className={styles.orderBox}>
        <div className={styles.orderTitle}>
          <b>Имя: </b>
          <input type="text" placeholder="Введите имя" />
        </div>
        <div className={styles.orderTitle}>
          <b>Фамилия: </b>
          <input type="text" placeholder="Введите фамилию" />
        </div>
        <div className={styles.orderTitle}>
          <b>Адресс: </b>
          <input type="text" placeholder="Введите адресс" />
        </div>
        <div className={styles.orderTitle}>
          <b>Телефон: </b>
          <input type="text" placeholder="Введите телефон" />
        </div>
        <button className={styles.orderButton} type="button">
          Заказать
        </button>
      </div>
      <div>
        <div className={styles.itemsBox}>
          {items.map(item => (
            <div key={item.id} className={styles.item}>
              <b>Наименование</b>
              <div>{item.name}</div>
              <b>Цена</b>
              <div>{item.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <b>Сумма покупок: </b>
        {totalPrice}
      </div>
    </div>
  );
};
