import { Modal, Typography, Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

export const PaymentModalVisa = ({ isOpen, setIsOpen, paymentInfo }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={styles.visaForm}>
        <Grid container spacing={3}>
          <Grid item xs={12} textAlign="center" alignItems="center">
            <Typography variant="h5" component="div" gutterBottom>
              Confirm Payment Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Package title: {paymentInfo.packagePay.title}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>Card Number: {paymentInfo.cardNumber}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>CVV: {paymentInfo.cvv}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Name on Card: {paymentInfo.cardName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Expiry Date: {paymentInfo.expDate}</Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Button variant="contained" fullWidth color="primary" onClick={handleClose}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export const PaymentModalBank = ({ isOpen, setIsOpen, paymentInfo }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={styles.visaForm}>
        <Grid container spacing={3}>
          <Grid item xs={12} textAlign="center" alignItems="center">
            <Typography variant="h5" component="div" gutterBottom>
              Confirm Payment Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Package title: {paymentInfo.packagePay.title}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>Card Number: {paymentInfo.cardNumber}</Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Button variant="contained" fullWidth color="primary" onClick={handleClose}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const styles = {
  visaForm: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "white",
    boxShadow: 24,
    padding: "60px",
    borderRadius: "10px",
    alignItems: "center",
  },
};