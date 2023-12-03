import React,{ useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { date } from "yup/lib/locale";

export const RoleAdd = (props) => {
  const [values, setValues] = useState({
    id: "",
    name: "",
    role: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submitRole=()=>{
    
  }

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card sx={{ minWidthwidth: 1000 }}>
        <CardHeader subheader="The information can be edited" title="Add role" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField
                fullWidth
                label="ID"
                name="id"
                onChange={handleChange}
                required
                value={values.id}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                size="small"

              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                onChange={handleChange}
                required
                value={values.role}
                variant="outlined"
                size="small"

              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={submitRole}>
            Add
          </Button>
        </Box>
      </Card>
    </form>
  );
};