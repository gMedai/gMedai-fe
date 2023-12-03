import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid,
  MenuItem,
  AppBar,
  Toolbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderBar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <Toolbar>
        <NextLink href="/" passHref>
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              textDecoration: "none",
              color: "black",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              "&:hover": {
                textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
                cursor: "pointer",
              },
            }}
          >
            Gmed AI
          </Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

const Register = () => {
  const [selectRole, setSelectRole] = useState("User");

  const handleSelectRole = (buttonName) => {
    setSelectRole(buttonName);
  };
  const genders = ["Male", "Female", "Other"];
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmpass: "",
      nickname: "",
      dob: "",
      phone: "",
      gender: "",
      // policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
      confirmpass: Yup.string().max(255).required("Confirm Password is required"),
      nickname: Yup.string().max(255).required("Nickname is required"),
      dob: Yup.string().max(255).required("Data of Birth is required"),
      phone: Yup.string().max(255).required("Phone is required"),
      gender: Yup.string().max(255).required("Gender is required"),
      // policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async () => {
      try {
        const response = await axios.post("http://localhost:3000/users", {
          ...formik.values,
          role: selectRole,
        });
        if (response.status === 201) {
          toast.success("🦄 Register Success!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          Router.push({
            pathname: "/login",
            query: { email: formik.values.email, password: formik.values.password },
          }).catch((err) => console.error(err));
        } else {
          console.error("Server responded with status:", response.status);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.error("User already exists", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          formik.values.email = "";
        } else {
          console.error("Server responded with status:", error.response.status);
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
      </Head>

      <HeaderBar />

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
            md={7}
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
                      }}
                      onClick={() => handleSelectRole("Tenant")}
                      variant="contained"
                    >
                      Tenant
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <TextField
                    error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                    sx={{ flex: "1", margin: "10px" }}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    label="First Name"
                    name="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                    sx={{ flex: "1", margin: "10px" }}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    label="Last Name"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
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
                  <TextField
                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                    sx={{ flex: "1", margin: "10px" }}
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Mobile phone"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ display: "flex" }}>
                  <TextField
                    error={Boolean(formik.touched.nickname && formik.errors.nickname)}
                    sx={{ flex: "1", margin: "10px" }}
                    helperText={formik.touched.nickname && formik.errors.nickname}
                    label="Nickname"
                    name="nickname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nickname}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(formik.touched.dob && formik.errors.dob)}
                    sx={{ flex: "1", margin: "10px" }}
                    helperText={formik.touched.dob && formik.errors.dob}
                    label="Date of Birth"
                    name="dob"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ display: "flex" }}>
                  <TextField
                    select
                    error={Boolean(formik.touched.gender && formik.errors.gender)}
                    sx={{ flex: "1", margin: "10px" }}
                    helperText={formik.touched.gender && formik.errors.gender}
                    label="Gender"
                    name="gender"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    variant="outlined"
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender}
                      </MenuItem>
                    ))}
                  </TextField>

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

                {/* <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                  }}
                >
                  <Checkbox
                    checked={formik.values.policy}
                    name="policy"
                    onChange={formik.handleChange}
                  />
                  <Typography color="textSecondary" variant="body2">
                    I have read the{" "}
                    <NextLink href="#" passHref>
                      <Link color="primary" underline="always" variant="subtitle2">
                        Terms and Conditions
                      </Link>
                    </NextLink>
                  </Typography>
                </Box> */}
                {/* {Boolean(formik.touched.policy && formik.errors.policy) && (
                  <FormHelperText error>{formik.errors.policy}</FormHelperText>
                )} */}
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
          <Grid item xs={12} md={5}>
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
