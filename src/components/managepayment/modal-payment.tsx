import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export const ModalAddPaymentMethod = ({ addPaymentMethod, isOpen, handleClose }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    accountHolder: "",
    type: "VISA",
    accountNumber: "",
    expiryDate: "",
    cvvNumber: "",
    zip: "",
    country: "",
  });

  const handleInputChange = (field) => (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [field]: event.target.value,
    });
  };

  const handleAddMethod = () => {
    addPaymentMethod(paymentInfo);
    setPaymentInfo({
      accountHolder: "",
      type: "VISA",
      accountNumber: "",
      expiryDate: "",
      cvvNumber: "",
      zip: "",
      country: "",
    });
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          background: "#fff",
          padding: "16px",
          maxWidth: "600px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Payment Method</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              value={paymentInfo.accountHolder}
              onChange={handleInputChange("accountHolder")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Card Type"
              value={paymentInfo.type}
              onChange={handleInputChange("type")}
              fullWidth
              margin="normal"
            >
              <MenuItem value="VISA">
                <img
                  src="/static/images/payments/visa.png"
                  style={{
                    height: 10,
                    width: 40,
                  }}
                />
                <span style={{ paddingLeft: "16px" }}>Visa</span>
              </MenuItem>
              <MenuItem value="MOMO">
                <img
                  src="/static/images/payments/momo.png"
                  style={{
                    height: 20,
                    width: 25,
                    verticalAlign: "text-bottom",
                  }}
                />
                <span style={{ paddingLeft: "16px" }}>Momo</span>
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={8}>
            <div style={{ display: "flex", gap: "16px" }}>
              {paymentInfo.type === "VISA" ? (
                <TextField
                  label="Card Number"
                  value={paymentInfo.accountNumber}
                  onChange={handleInputChange("accountNumber")}
                  fullWidth
                  margin="normal"
                />
              ) : (
                <TextField
                  label="Phone Number"
                  value={paymentInfo.accountNumber}
                  onChange={handleInputChange("accountNumber")}
                  fullWidth
                  margin="normal"
                />
              )}
            </div>
          </Grid>

          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="Expiration Date"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange("expiryDate")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="CVV Number"
                value={paymentInfo.cvvNumber}
                onChange={handleInputChange("cvvNumber")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="ZIP Code"
                value={paymentInfo.zip}
                onChange={handleInputChange("zip")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="Country"
                value={paymentInfo.country}
                onChange={handleInputChange("country")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
        </Grid>

        <Button
          sx={{ margin: "16px 0", backgroundColor: "#10B981" }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddMethod}
        >
          Add Payment Method
        </Button>
      </Box>
    </Modal>
  );
};

export const ModalEditPaymentMethod = ({ infoMethod, editPaymentMethod, isOpen, handleClose }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    accountHolder: "",
    type: "VISA",
    accountNumber: "",
    expiryDate: "",
    cvvNumber: "",
    zip: "",
    country: "",
  });

  const handleInputChange = (field) => (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [field]: event.target.value,
    });
  };

  const handleAddMethod = () => {
    // addPaymentMethod(paymentInfo);
    setPaymentInfo({
      accountHolder: "",
      type: "VISA",
      accountNumber: "",
      expiryDate: "",
      cvvNumber: "",
      zip: "",
      country: "",
    });
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          background: "#fff",
          padding: "16px",
          maxWidth: "600px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Edit Payment Method</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              value={paymentInfo.accountHolder}
              onChange={handleInputChange("accountHolder")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Card Type"
              value={paymentInfo.type}
              onChange={handleInputChange("type")}
              fullWidth
              margin="normal"
            >
              <MenuItem value="VISA">
                <img
                  src="/static/images/payments/visa.png"
                  style={{
                    height: 10,
                    width: 40,
                  }}
                />
                <span style={{ paddingLeft: "16px" }}>Visa</span>
              </MenuItem>
              <MenuItem value="MOMO">
                <img
                  src="/static/images/payments/momo.png"
                  style={{
                    height: 20,
                    width: 25,
                    verticalAlign: "text-bottom",
                  }}
                />
                <span style={{ paddingLeft: "16px" }}>Momo</span>
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={8}>
            <div style={{ display: "flex", gap: "16px" }}>
              {paymentInfo.type === "VISA" ? (
                <TextField
                  label="Card Number"
                  value={paymentInfo.accountNumber}
                  onChange={handleInputChange("accountNumber")}
                  fullWidth
                  margin="normal"
                />
              ) : (
                <TextField
                  label="Phone Number"
                  value={paymentInfo.accountNumber}
                  onChange={handleInputChange("accountNumber")}
                  fullWidth
                  margin="normal"
                />
              )}
            </div>
          </Grid>

          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="Expiration Date"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange("expiryDate")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="CVV Number"
                value={paymentInfo.cvvNumber}
                onChange={handleInputChange("cvvNumber")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="ZIP Code"
                value={paymentInfo.zip}
                onChange={handleInputChange("zip")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="Country"
                value={paymentInfo.country}
                onChange={handleInputChange("country")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
        </Grid>

        <Button
          sx={{ margin: "32px 0" }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddMethod}
        >
          Add Card Method
        </Button>
      </Box>
    </Modal>
  );
};

export const ModalDeletePaymentMethod = ({ deletePaymentMethod, isOpen, handleClose }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    accountHolder: "",
    type: "VISA",
    accountNumber: "",
    expiryDate: "",
    cvvNumber: "",
    zip: "",
    country: "",
  });

  const handleInputChange = (field) => (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [field]: event.target.value,
    });
  };

  const handleAddMethod = () => {
    // addPaymentMethod(paymentInfo);
    setPaymentInfo({
      accountHolder: "",
      type: "VISA",
      accountNumber: "",
      expiryDate: "",
      cvvNumber: "",
      zip: "",
      country: "",
    });
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px",
          background: "#fff",
          padding: "16px",
          maxWidth: "600px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Delete Payment Method</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              value={paymentInfo.accountHolder}
              onChange={handleInputChange("accountHolder")}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              label="Card Type"
              value={paymentInfo.type}
              onChange={handleInputChange("type")}
              fullWidth
              margin="normal"
            >
              <MenuItem value="VISA">
                <img
                  src="/static/images/payments/visa.png"
                  style={{
                    height: 10,
                    width: 40,
                  }}
                />
                <span style={{ paddingLeft: "16px" }}>Visa</span>
              </MenuItem>
              <MenuItem value="MOMO">
                <img
                  src="/static/images/payments/momo.png"
                  style={{
                    height: 20,
                    width: 25,
                    verticalAlign: "text-bottom",
                  }}
                />
                <span style={{ paddingLeft: "16px" }}>Momo</span>
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={8}>
            <div style={{ display: "flex", gap: "16px" }}>
              {paymentInfo.type === "VISA" ? (
                <TextField
                  label="Card Number"
                  value={paymentInfo.accountNumber}
                  onChange={handleInputChange("accountNumber")}
                  fullWidth
                  margin="normal"
                />
              ) : (
                <TextField
                  label="Phone Number"
                  value={paymentInfo.accountNumber}
                  onChange={handleInputChange("accountNumber")}
                  fullWidth
                  margin="normal"
                />
              )}
            </div>
          </Grid>

          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="Expiration Date"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange("expiryDate")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="CVV Number"
                value={paymentInfo.cvvNumber}
                onChange={handleInputChange("cvvNumber")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="ZIP Code"
                value={paymentInfo.zip}
                onChange={handleInputChange("zip")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {paymentInfo.type === "VISA" && (
              <TextField
                label="Country"
                value={paymentInfo.country}
                onChange={handleInputChange("country")}
                fullWidth
                margin="normal"
              />
            )}
          </Grid>
        </Grid>

        <Button
          sx={{ marginTop: "16px" }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddMethod}
        >
          Add Card Method
        </Button>
      </Box>
    </Modal>
  );
};
