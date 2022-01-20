import { FC } from 'react';

import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { getItemsInCart, getTotalPrice } from 'bll/cartReducer';
import { setOrderTC } from 'bll/productReducer';
import styles from 'ui/CartPage/Order/OrderFormik.module.scss';
import { ModalComponent } from 'ui/common/ModalComponent';

export const OrderFormik: FC = () => {
  const dispatch = useDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      validateOnMount: true,
      name: '',
      lastName: '',
      address: '',
      phone: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      lastName: yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      address: yup
        .string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    }),
    onSubmit: values => {
      formik.resetForm();
      dispatch(setOrderTC(values));
      localStorage.clear();
      dispatch(getItemsInCart([]));
      dispatch(getTotalPrice(0));
    },
  });

  const disabled = !(formik.isValid && formik.dirty);

  return (
    <div className={styles.formikContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Paper className={styles.orderBox}>
          <div className={styles.orderTitle}>
            <TextField
              label="Введите Имя"
              variant="outlined"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: 'red' }}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className={styles.orderTitle}>
            <TextField
              label="Введите Фамилию"
              variant="outlined"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div className={styles.orderTitle}>
            <TextField
              label="Введите адресс"
              variant="outlined"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps('address')}
            />
            {formik.touched.address && formik.errors.address ? (
              <div style={{ color: 'red' }}>{formik.errors.address}</div>
            ) : null}
          </div>
          <div className={styles.orderTitle}>
            <TextField
              label="Введите телефон"
              variant="outlined"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div style={{ color: 'red' }}>{formik.errors.phone}</div>
            ) : null}
          </div>
          <ModalComponent
            disabled={disabled}
            userName={formik.values.name}
            submit={formik.submitForm}
          />
        </Paper>
      </form>
    </div>
  );
};

export type FormValuesType = {
  name: string;
  lastName: string;
  address: string;
  phone: string;
};
