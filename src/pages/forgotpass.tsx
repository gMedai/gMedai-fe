import Head from "next/head";
import Router from "next/router";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  AppBar,
  IconButton,
  Toolbar,
  Link,
  Grid,
} from "@mui/material";
import { QrCode2 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import authenService from "@services/authenService";
import { LoginQR } from "../components/login/login-qr";
import NextLink from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HeaderBar = () => {
  return (
    <NextLink href="/" passHref>
      <Typography
        variant="h6"
        sx={{
          fontSize: "20px",
          textDecoration: "none",
          color: "black",
          display: "inline",
          position: "absolute",
          top: "25px",
          left: "25px",
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
  );
};

const ForgotPass = () => {
  const [selectRole, setSelectRole] = useState("User");

  const handleSelectRole = (buttonName) => {
    setSelectRole(buttonName);
  };

  const [sendOTP, setSendOTP] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [displayOtp, setDisplayOtp] = useState(false);
  const [displayPass, setDisplayPass] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef<() => void | undefined>();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        if (savedCallback.current) {
          savedCallback.current();
        }
      };

      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    if (countdown > 0) {
      setCountdown((prevCountdown) => prevCountdown - 1);
    } else {
      setIsDisabled(false);
    }
  }, 1000);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
      confirmpass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      otp: Yup.string().max(255).required("OTP is required"),
      confirmpass: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .max(255)
        .required("Confirm Password is required"),
    }),
    onSubmit: async () => {
      // Router.push("/").catch(console.error);
    },
  });

  const handleSendOtp = async (event) => {
    if (countdown > 0) {
      return;
    } else {
      if (!formik.errors.email) {
        try {
          const response = await axios.post("http://localhost:3000/users/sendOtp", {
            email: formik.values.email,
          });
          if (response) {
            toast.success(`Email has been sent to ${formik.values.email}`, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          setDisplayOtp(true);
          setIsDisabled(true);
          setCountdown(60);
        } catch (error) {
          if (error.response.status === 404) {
            toast.error("User not found", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (error.response.status === 500) {
            toast.error(`Please wait a moment to resend the OTP`, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    }
  };

  const handleVerifyOtp = async (event) => {
    if (!formik.values.otp) {
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:3000/users/verifyOtp", {
          email: formik.values.email,
          otp: formik.values.otp,
        });
        if (response.data === true) {
          toast.success(`Verify success`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setDisplayPass(true);
          setCountdown(0);
        } else {
          toast.error(`Otp Incorrect or expired OTP `, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Server responded with status:", error.response.status);
      }
    }
  };

  const handleSetNewPassword = async (event) => {
    if (!formik.values.password || !formik.values.confirmpass) {
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:3000/users/reset-password", {
          email: formik.values.email,
          newPassword: formik.values.password,
        });
        console.log(response);

        if (response.status === 201) {
          toast.success(`Change password success`, {
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
        }
      } catch (error) {
        console.error("Server responded with status:", error.response.status);
      }
    }
  };

  return (
    <>
      <Head>
        <title>ForgotPass | Material Kit</title>
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
                      Forgot your password
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Please enter your email address to reset password
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
                {displayOtp && (
                  <Box display="flex" justifyContent="center">
                    <TextField
                      error={Boolean(formik.touched.otp && formik.errors.otp)}
                      fullWidth
                      helperText={formik.touched.otp && formik.errors.otp}
                      label="OTP"
                      margin="normal"
                      name="otp"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.otp}
                      variant="outlined"
                    />
                    <Button
                      sx={{
                        marginLeft: "20px",
                        marginTop: "16px",
                        marginBottom: "8px",
                        width: "200px",
                        background: isDisabled
                          ? "#ccc"
                          : "linear-gradient(to right, #9083D5, #807593)",
                        color: "#fff",
                      }}
                      color="primary"
                      variant="contained"
                      onClick={handleSendOtp}
                      disabled={isDisabled}
                    >
                      {countdown > 0 ? (
                        <div
                          style={{
                            fontWeight: "800",
                            color: "red",
                          }}
                        >
                          {formatTime(countdown)}
                        </div>
                      ) : (
                        "Resend Otp"
                      )}
                    </Button>
                  </Box>
                )}

                {displayPass && (
                  <>
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

                    <TextField
                      error={Boolean(formik.touched.confirmpass && formik.errors.confirmpass)}
                      fullWidth
                      helperText={formik.touched.confirmpass && formik.errors.confirmpass}
                      label="Confirm Password"
                      margin="normal"
                      name="confirmpass"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.confirmpass}
                      variant="outlined"
                    />
                  </>
                )}

                <Box
                  sx={{
                    py: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {!displayOtp && (
                    <Button
                      sx={{
                        marginRight: "100px",
                        width: "200px",
                        background: formik.touched.email
                          ? "linear-gradient(to right, #9083D5, #807593)"
                          : "#ccc",
                        color: "#fff",
                      }}
                      color="primary"
                      variant="contained"
                      onClick={handleSendOtp}
                      disabled={!formik.touched.email}
                    >
                      Continue
                    </Button>
                  )}

                  {!displayPass && displayOtp && (
                    <Button
                      sx={{
                        marginRight: "100px",
                        width: "200px",
                        background: formik.touched.otp
                          ? "linear-gradient(to right, #9083D5, #807593)"
                          : "#ccc",
                        color: "#fff",
                      }}
                      color="primary"
                      variant="contained"
                      onClick={handleVerifyOtp}
                      disabled={!formik.touched.otp}
                    >
                      Continue
                    </Button>
                  )}
                  {displayPass && (
                    <Button
                      sx={{
                        marginRight: "100px",
                        width: "200px",
                        background:
                          formik.touched.password && formik.touched.confirmpass
                            ? "linear-gradient(to right, #9083D5, #807593)"
                            : "#ccc",
                        color: "#fff",
                      }}
                      color="primary"
                      variant="contained"
                      onClick={handleSetNewPassword}
                      disabled={!formik.touched.password && !formik.touched.confirmpass}
                    >
                      Continue
                    </Button>
                  )}

                  <Button
                    sx={{
                      width: "200px",
                      background: "#fff",
                      color: "#000",
                      border: "1px solid #000",
                    }}
                  >
                    <NextLink href="/login" passHref>
                      <Link variant="subtitle2" underline="hover" sx={{ color: "#000" }}>
                        Cancel
                      </Link>
                    </NextLink>
                  </Button>
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

export default ForgotPass;
