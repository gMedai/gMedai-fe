import Head from "next/head";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Link,
  Grid,
} from "@mui/material";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../contexts/auth-context";
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

const Login = () => {
  const authContext: any = useAuthContext();

  const [selectRole, setSelectRole] = useState("User");

  const handleSelectRole = (buttonName) => {
    setSelectRole(buttonName);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async () => {
      try {
        const response = await axios.post("http://localhost:3000/auth", {
          ...formik.values,
          role: selectRole,
        });
        if (response.status === 201) {
          toast.success("🦄 Login Success!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const { access_token, user } = response.data;
          console.log(user.role);

          authContext.signIn(user);
          if (user.role === "User") {
            Router.push({
              pathname: "/landing-page",
            }).catch((err) => console.error(err));
          } else if (user.role === "Tenant") {
            Router.push({
              pathname: "/tenant",
            }).catch((err) => console.error(err));
          }
        } else {
          console.error("Server responded with status:", response.status);
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.error("Account doesn't exist ", {
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

  useEffect(() => {
    const { email, password } = Router.query;

    if (typeof email === "string" && typeof password === "string") {
      // Xử lý nếu email và password là string (URL chỉ có một tham số)
      formik.setValues({ email, password });
    }
  }, [Router.query]);

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
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
            md={6}
            sx={{
              padding: "100px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container
              maxWidth="sm"
              // sx={{
              //   border: "1px solid #ccc",
              //   borderRadius: "10px",
              //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              //   // padding: "10px 50px",
              // }}
            >
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
                      Log in
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Please Log in To Continue
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      sx={{
                        background:
                          selectRole === "User"
                            ? "linear-gradient(to right, #9083D5, #807593)"
                            : "none",
                        color: selectRole === "User" ? "#fff" : "#000",
                        border: selectRole === "User" ? "none" : "1px solid #ccc",
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

                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box
                  sx={{
                    py: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      marginRight: "100px",
                      width: "100px",

                      background: "linear-gradient(to right, #9083D5, #807593)",

                      color: "#fff",
                    }}
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Log in
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <NextLink href="/forgotpass" passHref>
                      <Link variant="subtitle2" underline="hover">
                        Forgotten Password
                      </Link>
                    </NextLink>
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography color="textSecondary" variant="body2">
                    Don&apos;t have an account?{" "}
                    <NextLink href="/register" passHref>
                      <Link variant="subtitle2" underline="hover">
                        Create new account.
                      </Link>
                    </NextLink>
                  </Typography>
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

export default Login;
