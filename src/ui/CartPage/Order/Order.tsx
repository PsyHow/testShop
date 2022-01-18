import { FC } from 'react';

import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';

import styles from './Order.module.scss';

export const Order: FC = () => (
  <Paper className={styles.orderBox}>
    <div className={styles.orderTitle}>
      <TextField label="Введите имя" variant="outlined" />
    </div>
    <div className={styles.orderTitle}>
      <TextField label="Введите фамилию" variant="outlined" />
    </div>
    <div className={styles.orderTitle}>
      <TextField label="Введите адресс" variant="outlined" />
    </div>
    <div className={styles.orderTitle}>
      <TextField label="Введите телефон" variant="outlined" />
    </div>
    <Button variant="contained" className={styles.orderButton} type="button">
      Заказать
    </Button>
  </Paper>
);
