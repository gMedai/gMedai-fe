import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Modal,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { useState } from "react";
import { CustomerModal } from "./customer-modal";
import { userService } from "@services/userService";

export const CustomerToolbar = ({ setCustomers, ...props }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const handleCreateCustomer = async (user: any) => {
    setOpenModalAdd(false);
    setOpenLoading(true);
    const userRes = await userService.create(user);
    setCustomers((prev) => {
      return [userRes, ...prev];
    });
    setOpenLoading(false);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Customers
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
