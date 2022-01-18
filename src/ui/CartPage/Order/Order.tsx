import { FC } from 'react';

import styles from './Order.module.scss';

export const Order: FC = () => (
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
);
