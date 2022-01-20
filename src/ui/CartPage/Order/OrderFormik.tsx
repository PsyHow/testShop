import { FC } from 'react';

import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { setOrderTC } from 'bll/productReducer';
import styles from 'ui/CartPage/Order/OrderFormik.module.scss';
import { ModalComponent } from 'ui/common/ModalComponent';

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
    validate: values => {
      const errors: Partial<FormValuesType> = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.lastName) {
        errors.lastName = 'Required';
      }
      if (!values.address) {
        errors.address = 'Required';
      }
      if (!values.phone) {
        errors.phone = 'Required';
      }
      return errors;
    },
    onSubmit: values => {
      formik.resetForm();
      dispatch(setOrderTC(values));
    },
  });

  const disabled = !(formik.isValid && formik.dirty);

  return (
    <div className={styles.formikContainer}>
      <form id="formId" onSubmit={formik.handleSubmit}>
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
          <ModalComponent disabled={disabled} userName={formik.values.name} />
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
