import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../utils/fontawesome";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { BenhKhopGoiSave } from "./benhkhopgoi-save";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useAuthContext } from "../../contexts/auth-context";
const gt = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

export const BenhKhopGoiResult = (props) => {
  const authContext: any = useAuthContext();
  const isAuthenticated = authContext.isAuthenticated || false;
  console.log(authContext, isAuthenticated);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    fullname: " ",
    sex: " ",
    dob: null,
    address: " ",
  });

  useEffect(() => {
    if (authContext.user) {
      setValues({
        ...values,
        fullname: authContext.user.first_name + " " + authContext.user.last_name,
        sex: authContext.user.gender,
      });
    }
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDate = (value) => {
    setValues({
      ...values,
      dob: value,
    });
  };

  const { data } = props;

  return (
    <Card
      {...props}
      sx={{
        height: "auto",
        width: "100%",
        marginTop: "-28px",
      }}
    >
      <CardContent>
        <Typography
          color="textSecondary"
          variant="body2"
          fontSize={16}
          flexGrow={1}
          align="center"
          sx={{ paddingTop: "5px", paddingBottom: "16px", fontWeight: "bold" }}
        >
          Diagnostic result
        </Typography>

        <TextField
          fullWidth
          label="Result from Model"
          type="text"
          value={data ? data.result1 : ""}
          variant="outlined"
          aria-readonly
          sx={{ fontSize: "100%", marginBottom: "8px" }}
        />

        {/* <TextField
          fullWidth
          label="Result from Doctor"
          name="resultDoctor"
          // helperText=  {errors ? errors : ''}
          onChange={handleChange}
          type="string"
          value={values.resultDoctor}
          variant="outlined"
          // required
          sx={{ fontSize: "100%" }}
          multiline
        /> */}
      </CardContent>
      <Divider />
      <CardContent sx={{ paddingTop: "16px" }}>
        <Typography
          color="textSecondary"
          variant="body2"
          fontSize={16}
          flexGrow={1}
          align="center"
          sx={{ paddingBottom: "16px", fontWeight: "bold" }}
        >
          Infomation User
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="fullname"
          onChange={handleChange}
          type="string"
          value={values.fullname}
          variant="outlined"
          required
          sx={{ fontSize: "100%", marginBottom: "16px" }}
        />
        <Grid container spacing={3}>
          <Grid item md={5} xs={5}>
            <TextField
              fullWidth
              label="Giới tính"
              name="sex"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.sex}
              variant="outlined"
            >
              {gt.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item md={7} xs={7}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of birth"
                value={values.dob}
                onChange={(newValue) => handleChangeDate(newValue)}
                renderInput={(props) => <TextField {...props} />}
                InputAdornmentProps={{ position: "end" }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Place of residence"
          name="address"
          onChange={handleChange}
          type="string"
          value={values.address}
          variant="outlined"
          required
          sx={{ fontSize: "100%", marginTop: "16px", marginBottom: "16px" }}
          multiline
        />
        <Button
          color="success"
          onClick={handleOpen}
          variant="contained"
          sx={{
            width: "60px",
            height: "50px",
            margin: "auto",
            display: "block",
          }}
          fullWidth
        >
          <FontAwesomeIcon icon="print" size="lg" />
        </Button>
      </CardContent>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#ffffff",
        }}
      >
        <BenhKhopGoiSave data={data} />
      </Modal>
    </Card>
  );
};
