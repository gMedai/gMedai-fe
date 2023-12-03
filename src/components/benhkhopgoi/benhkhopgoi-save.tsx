import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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

export const BenhKhopGoiSave = (props) => {
  // const [values, setValues] = useState({
  //   id: "",
  //   name: "",
  //   role: "",
  // });

  const { data } = props;
  const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  const formik = useFormik({
    initialValues: {
      hoten: "",
      sdt: "",
      diachi: "",
    },
    validationSchema: Yup.object({
      hoten: Yup.string().max(255).required("Họ tên "),
      sdt: Yup.string()
        .matches(phoneRegExp, "Số điện thoại không hợp lệ") 
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số") 
        .max(10, "Số điện thoại không được vượt quá 10 chữ số")
        .required("Số điện thoại là bắt buộc"),
    }),
    onSubmit: async () => {
      //Router.push("/").catch(console.error);
      alert("Do something")
    },
  });
  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const submitRole=()=>{
  //   alert(values)
  //   console.log(values)
  // }

  return (
    // <form autoComplete="off" noValidate {...props}>
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ minWidthwidth: 1000 }}>
        <CardHeader subheader="Save" title="Add" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <TextField
                error={Boolean(formik.touched.hoten && formik.errors.hoten)}
                fullWidth
                helperText={formik.touched.hoten && formik.errors.hoten}
                label="Họ Tên"
                margin="normal"
                name="hoten"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}

                value={formik.values.hoten}
                variant="outlined"
                size="small"
              />

            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(formik.touched.sdt && formik.errors.sdt)}
                fullWidth
                helperText={formik.touched.sdt && formik.errors.sdt}
                label="Số điện thoại"
                name="sdt"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sdt}
                variant="outlined"
                size="small"
              
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                error={Boolean(formik.touched.diachi && formik.errors.diachi)}
                fullWidth
                helperText={formik.touched.diachi && formik.errors.diachi}
                label="Địa chỉ"
                name="diachi"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}

                value={formik.values.diachi}
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
          <Button color="primary" variant="contained" type="submit">
            In
          </Button>
        </Box>
      </Card>
    </form>
  );
};