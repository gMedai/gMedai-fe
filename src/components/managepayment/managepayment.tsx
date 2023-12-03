import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  ModalAddPaymentMethod,
  ModalDeletePaymentMethod,
  ModalEditPaymentMethod,
} from "./modal-payment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PackageService } from "./package-service";
export const ManagePayment = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: uuid(),
      type: "VISA",
      accountNumber: "1234567890123456",
      expiryDate: "12/24",
      accountHolder: "John Doe",
    },
    {
      id: uuid(),
      type: "MOMO",
      accountNumber: "0987654321",
      expiryDate: "N/A",
      accountHolder: "Jane Smith",
    },
  ]);

  const addPaymentMethod = (newMethod) => {
    setPaymentMethods((prevMethods) => [...prevMethods, newMethod]);
  };

  const editPaymentMethod = (editedMethod) => {
    setPaymentMethods((prevMethods) => {
      const updatedMethods = prevMethods.map((method) => {
        if (method.id === editedMethod.id) {
          return editedMethod;
        }
        return method;
      });
      return updatedMethods;
    });
  };

  const deletePaymentMethod = (methodIdToDelete) => {
    setPaymentMethods((prevMethods) => {
      const updatedMethods = prevMethods.filter((method) => method.id !== methodIdToDelete);
      return updatedMethods;
    });
  };

  const [subscriptionPackages, setSubscriptionPackages] = useState(["Basic", "Premium"]);

  const addSubscriptionPackage = (newPackage) => {
    setSubscriptionPackages((prevPackages) => [...prevPackages, newPackage]);
  };

  const deleteSubscriptionPackage = (index) => {
    setSubscriptionPackages((prevPackages) => [
      ...prevPackages.slice(0, index),
      ...prevPackages.slice(index + 1),
    ]);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function splitIntoBlocks(str, blockSize) {
    const blocks = [];
    for (let i = 0; i < str.length - blockSize; i += blockSize) {
      const block = str.slice(i, i + blockSize).replace(/./g, "*");
      blocks.push(block);
    }
    return blocks;
  }

  const [isOpenModalAddPayment, setIsOpenModalAddPayment] = useState(false);
  const [isOpenModalEditPayment, setIsOpenModalEditPayment] = useState(false);
  const [isOpenModalDeletePayment, setIsDeletePayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMethodPayment, setIsCurrentMethodPayment] = useState(false);

  const handleOpenModalAddPayment = () => {
    setIsOpenModalAddPayment(true);
  };

  const handleOpenModalEditPayment = (method) => {
    setIsModalOpen(true);
    setIsCurrentMethodPayment(method);
  };

  const handleOpenModalDeletePayment = () => {
    setIsDeletePayment(true);
  };

  const handleCloseModalAddPayment = () => {
    setIsOpenModalAddPayment(false);
  };

  const handleCloseModalEditPayment = () => {
    setIsOpenModalEditPayment(false);
  };

  const handleCloseModalDeletePayment = () => {
    setIsDeletePayment(false);
  };
  return (
    <Container>
      <Typography sx={{ marginBottom: "24px" }} variant="h5" gutterBottom>
        Payment method
      </Typography>

      <div>
        <Grid container spacing={2}>
          {paymentMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  borderRadius: "10px",
                  height: "180px",
                  background: "linear-gradient(to right, #1CD8D2, #93EDC7)",
                  padding: "16px 8px",
                  color: "#fff",
                  position: "relative",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                {method.type === "VISA" && (
                  <img
                    src="/static/images/payments/visa.png"
                    style={{
                      height: 25,
                      width: 40,
                    }}
                  />
                )}
                {method.type === "MOMO" && (
                  <img
                    src="/static/images/payments/momo.png"
                    style={{
                      height: 25,
                      width: 40,
                    }}
                  />
                )}
                <Box
                  sx={{
                    textAlign: "left",
                    margin: "32px  0",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  {splitIntoBlocks(method.accountNumber, 4).map((block, index) => (
                    <span key={index} style={{ padding: "0px 16px" }}>
                      {block}
                    </span>
                  ))}
                  <span style={{ paddingLeft: "4px" }}>
                    {method.accountNumber.substring(method.accountNumber.length - 4)}
                  </span>
                </Box>
                <Box
                  sx={{
                    marginTop: "32px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 8px",
                  }}
                >
                  <Box sx={{ fontSize: "9px" }}>
                    <Typography sx={{ fontWeight: "600", fontSize: "13px" }}>Name</Typography>
                    <Typography sx={{ fontSize: "12px" }} gutterBottom>
                      {method.accountHolder}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: "600", fontSize: "13px" }}>Expiry At</Typography>

                    <Typography sx={{ fontSize: "12px" }} gutterBottom>
                      {method.expiryDate || "N/A"}
                    </Typography>
                  </Box>
                </Box>
                <MoreVertIcon
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                />

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={() => handleOpenModalEditPayment(method)}>Edit</MenuItem>
                  <MenuItem onClick={handleOpenModalDeletePayment}>Delete</MenuItem>
                </Menu>
                <ModalEditPaymentMethod
                  editPaymentMethod={editPaymentMethod}
                  isOpen={isOpenModalEditPayment}
                  handleClose={handleCloseModalEditPayment}
                  infoMethod={method}
                />

                <ModalDeletePaymentMethod
                  deletePaymentMethod={deletePaymentMethod}
                  isOpen={isOpenModalDeletePayment}
                  handleClose={handleCloseModalDeletePayment}
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "#f5f5f5",
                padding: "16px",
                cursor: "pointer",
                height: "180px",
                flexDirection: "column",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleOpenModalAddPayment}
            >
              <ControlPointIcon style={{ fontSize: "40px", marginBottom: "16px" }} />
              <span style={{ fontSize: "13px" }}>Add payment method</span>
            </Box>
          </Grid>
          <ModalAddPaymentMethod
            addPaymentMethod={addPaymentMethod}
            isOpen={isOpenModalAddPayment}
            handleClose={handleCloseModalAddPayment}
          />
        </Grid>
      </div>

      <Typography sx={{ margin: "32px 0" }} variant="h5" gutterBottom>
        Package service
      </Typography>
      <PackageService />
    </Container>
  );
};
