import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Link, TextField, Typography, Grid, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderBarAuth from "../components/header-auth";

const Register = () => {
  const [selectRole, setSelectRole] = useState("User");

  const handleSelectRole = (buttonName) => {
    setSelectRole(buttonName);
  };
  const partnerTypes = ["Hospital", "Clinic", "Doctor"];
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      partnerType: "Hospital",
      fullName: "",
      address: "",
      password: "",
      confirmpass: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      email: Yup.string().max(255).required("Email is required"),
      // email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      partnerType: Yup.string().max(255),
      // partnerType: Yup.string().max(255).required("Partner type is required"),
      fullName: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      // address: Yup.string().max(255).required("Address is required"),
      address: Yup.string().max(255),
      confirmpass: Yup.string().max(255).required("Confirm Password is required"),
    }),
    onSubmit: async () => {
      console.log(selectRole);
      
      Router.push({
        pathname: "/login",
        query: { username: formik.values.username, password: formik.values.password, role: selectRole },
      }).catch((err) => console.error(err));
      // try {
      //   const response = await axios.post("http://localhost:3000/users", {
      //     ...formik.values,
      //     role: selectRole,
      //   });
      //   if (response.status === 201) {
      //     toast.success("🦄 Register Success!", {
      //       position: "top-right",
      //       autoClose: 1500,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      //     Router.push({
      //       pathname: "/login",
      //       query: { email: formik.values.email, password: formik.values.password },
      //     }).catch((err) => console.error(err));
      //   } else {
      //     console.error("Server responded with status:", response.status);
      //   }
      // } catch (error) {
      //   if (error.response.status === 409) {
      //     toast.error("User already exists", {
      //       position: "top-right",
      //       autoClose: 1500,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     });
      //     formik.values.email = "";
      //   } else {
      //     console.error("Server responded with status:", error.response.status);
      //   }
      // }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
      </Head>

      <HeaderBarAuth />

      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Grid container sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "50px 24px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container>
              <form
                style={{
                  margin: "20px",
                }}
                onSubmit={formik.handleSubmit}
              >
                <Box
                  sx={{
                    my: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography color="textPrimary" variant="h5">
                      Create a new account
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Use your email to create a new account
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      sx={{
                        background:
                          selectRole === "User"
                            ? "linear-gradient(to right, #9083D5, #807593)"
                            : "none", // Thay đổi nền khi nút User được chọn
                        color: selectRole === "User" ? "#fff" : "#000", // Thay đổi màu chữ khi nút User được chọn
                        border: selectRole === "User" ? "none" : "1px solid #ccc", // Bỏ viền khi nút User được chọn
                        "&:hover": {
                          background: "none",
                          color: "#000",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 4px",
                        },
                      }}
                      onClick={() => handleSelectRole("User")}
                      variant="contained"
                    >
                      User
                    </Button>
                    <Button
                      sx={{
                        background:
                          selectRole === "Tenant"
                            ? "linear-gradient(to right, #9083D5, #807593)"
                            : "#fff",
                        color: selectRole === "Tenant" ? "#fff" : "#000",
                        border: selectRole === "Tenant" ? "none" : "1px solid #ccc",
                        "&:hover": {
                          background: "none",
                          color: "#000",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 4px",
                        },
                      }}
                      onClick={() => handleSelectRole("Tenant")}
                      variant="contained"
                    >
                      Partner
                    </Button>
                  </Box>
                </Box>
                {selectRole == "User" && (
                  <Box>
                    <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                        label="Full Name"
                        name="fullName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.username && formik.errors.username)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.username && formik.errors.username}
                        label="User name"
                        name="username"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email Address"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.password && formik.errors.password}
                        label="Password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(formik.touched.confirmpass && formik.errors.confirmpass)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.confirmpass && formik.errors.confirmpass}
                        label="Confirm Password"
                        name="confirmpass"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.confirmpass}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                )}
                {selectRole == "Tenant" && (
                  <Box>
                     <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.username && formik.errors.username)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.username && formik.errors.username}
                        label="User name"
                        name="username"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.email && formik.errors.email}
                        label="Email Address"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <TextField
                        select
                        error={Boolean(formik.touched.partnerType && formik.errors.partnerType)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.partnerType && formik.errors.partnerType}
                        label="Partner type"
                        name="partnerType"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.partnerType}
                        variant="outlined"
                      >
                        {partnerTypes.map((partnerType) => (
                          <MenuItem key={partnerType} value={partnerType}>
                            {partnerType}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                        sx={{ flex: "2", margin: "10px" }}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                        label="Name parter"
                        name="fullName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.address && formik.errors.address)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.address && formik.errors.address}
                        label="Address Partner"
                        name="address"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ display: "flex" }}>
                      <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.password && formik.errors.password}
                        label="Password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(formik.touched.confirmpass && formik.errors.confirmpass)}
                        sx={{ flex: "1", margin: "10px" }}
                        helperText={formik.touched.confirmpass && formik.errors.confirmpass}
                        label="Confirm Password"
                        name="confirmpass"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.confirmpass}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                )}

                <Box
                  sx={{
                    py: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center", // Đặt giữa theo chiều ngang
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      background: "linear-gradient(to right, #9083D5, #807593)",
                      color: "#fff",
                      marginRight: "50px",
                    }}
                    // disabled={formik.isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Register Now
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="textSecondary" variant="body2">
                      Have an account?{" "}
                      <NextLink href="/login" passHref>
                        <Link variant="subtitle2" underline="hover">
                          Log In
                        </Link>
                      </NextLink>
                    </Typography>
                  </Box>
                </Box>
              </form>
              <ToastContainer />
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container
              sx={{
                backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                width="500"
                height="500"
                alt="image"
                src="https://www.pranathiss.com/static/assets/images/health-care.webp"
              />
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
