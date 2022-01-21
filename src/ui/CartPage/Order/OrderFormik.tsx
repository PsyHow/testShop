import { FC } from 'react';

import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { setOrderTC } from 'bll';
import { phoneRegExp } from 'const';
import { ModalComponent } from 'ui';
import styles from 'ui/CartPage/Order/OrderFormik.module.scss';

export const OrderFormik: FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      validateOnMount: true,
      name: '',
      lastName: '',
      address: '',
      phone: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().min(4, 'Too Short!').max(50, 'Too Long!').required('Required'),
      lastName: yup
        .string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      address: yup
        .string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    }),
    onSubmit: values => {
      formik.resetForm();
      dispatch(setOrderTC(values));
      localStorage.clear();
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
