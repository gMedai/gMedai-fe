import React, { useState } from "react";
import { Box } from "@mui/system";
import { Grid, Typography, FormGroup, Tab, TextField, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { PaymentModalVisa, PaymentModalBank } from "./modal-payment";

const VisaForm = (packagePay) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePayment = () => {
    setIsOpen(true);
  };

  return (
    <FormGroup sx={styles.visaForm}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            required
            id="cardNumber"
            label="Card Number"
            autoComplete="cc-number"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="cvv"
            label="CVV"
            autoComplete="cc-csc"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            autoComplete="cc-name"
            fullWidth
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="expDate"
            label="Expire Date"
            autoComplete="cc-exp"
            fullWidth
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
            Pay
          </Button>
        </Grid>
      </Grid>
      <PaymentModalVisa
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        paymentInfo={{ packagePay, cardNumber, cvv, cardName, expDate }}
      />
    </FormGroup>
  );
};

const BankForm = (packagePay) => {
  const [cardNumber, setCardNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePayment = () => {
    setIsOpen(true);
  };

  return (
    <FormGroup sx={styles.visaForm}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            required
            id="cardNumber"
            label="Card Number"
            autoComplete="cc-number"
            fullWidth
            value={cardNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
            Pay
          </Button>
        </Grid>
      </Grid>
      <PaymentModalBank
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        paymentInfo={{ packagePay, cardNumber }}
      />
    </FormGroup>
  );
};

const MomoForm = (packagePay) => {
  const [cardNumber, setCardNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handlePayment = () => {
    setIsOpen(true);
  };

  return (
    <FormGroup sx={styles.visaForm}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            required
            id="cardNumber"
            label="Phone Number"
            autoComplete="cc-number"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
            Pay
          </Button>
        </Grid>
      </Grid>
      <PaymentModalBank
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        paymentInfo={{ packagePay, cardNumber }}
      />
    </FormGroup>
  );
};

export const Payment = (packagePay) => {
  const [paymentMethod, setPaymentMethod] = useState("visa");

  const handleChange = (event, newValue) => {
    setPaymentMethod(newValue);
  };

  return (
    <Box sx={styles.box}>
      <Grid container spacing={3}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h5" fontWeight="bold">
            Choose your payment method
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TabContext value={paymentMethod}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="VISA" value="visa" />
                <Tab label="Bank" value="bank" />
                <Tab label="Momo" value="momo" />
              </TabList>
            </Box>
            <TabPanel value="visa">
              <VisaForm packagePay={packagePay} />
            </TabPanel>
            <TabPanel value="bank">
              <BankForm packagePay={packagePay} />
            </TabPanel>
            <TabPanel value="momo">
              <MomoForm packagePay={packagePay} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  box: {
    width: "50%",
    margin: "auto",
    marginTop: "70px",
    border: "2px solid gray",
    borderRadius: "10px",
    p: 2,
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  visaForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
};