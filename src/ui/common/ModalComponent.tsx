import { FC, useState } from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from './ModalComponent.module.scss';

import { selectTotalPriceCount } from 'selectors/selectors';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

type PropsType = {
  disabled: boolean;
  userName: string;
};

export const ModalComponent: FC<PropsType> = ({ disabled, userName }) => {
  const totalPrice = useSelector(selectTotalPriceCount);

  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  return (
    <>
      <Button disabled={disabled} variant="contained" onClick={handleOpen}>
        Заказать
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Уважаемый {userName} !
          </Typography>
          <Typography
            className={styles.modalDescription}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Сумма вашего заказа: {totalPrice} USD
            <Button
              variant="contained"
              className={styles.button}
              type="submit"
              form="formId"
              onClick={handleClose}
            >
              Подтвердить заказ
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
