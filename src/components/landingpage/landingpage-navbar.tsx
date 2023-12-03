import { AppBar, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import React from "react";
import { useAuthContext } from "../../contexts/auth-context";
import { AccountPopover } from "../account-popover";
import { useRef, useState } from "react";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";

export const LandingPageNavbar = (props) => {
  const authContext: any = useAuthContext();
  const isAuthenticated = authContext.isAuthenticated || false;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <AppBar position="static" sx={{ background: "transparent" }}>
      <Container>
        <NextLink href="/landing-page">
          <Logo>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/48165f60-7317-48bd-a5db-8cd7eec18d98?apiKey=989a6631d9bb4bf5b8bb7d79bb088c53&"
              alt="Logo"
            />
            <Title>GMed AI</Title>
          </Logo>
        </NextLink>
        <Navigation>
          <NextLink href="/benhkhopgoi">
            <NavItem>Diagnostic</NavItem>
          </NextLink>
          <NextLink href="#services">
            <NavItem>Services</NavItem>
          </NextLink>
          <NextLink href="#about-us">
            <NavItem>About Us</NavItem>
          </NextLink>
          <NextLink href="#pricing">
            <NavItem>Pricing</NavItem>
          </NextLink>
        </Navigation>
        {isAuthenticated ? (
          <Box>
            <Avatar
              onClick={() => setOpenAccountPopover(true)}
              ref={settingsRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
                ml: 1,
              }}
              src="/static/images/avatars/avatar_1.png"
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
            <Typography variant="body1" style={{ color: "#000", paddingRight: "20px" }}>
              Hello, <b>{authContext.user.nickname}</b>
            </Typography>
            <AccountPopover
              anchorEl={settingsRef.current}
              open={openAccountPopover}
              onClose={() => setOpenAccountPopover(false)}
            />
          </Box>
        ) : (
          <Auth>
            <NextLink href="/login">
              <AuthButton>Login</AuthButton>
            </NextLink>
            <NextLink href="/register">
              <AuthButton
                sx={{ background: "linear-gradient(to right, #9083D5, #807593)" }}
                active={true}
              >
                Register
              </AuthButton>
            </NextLink>
          </Auth>
        )}
      </Container>
    </AppBar>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 20,
  padding: "0 20px",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

const Logo = styled("button")(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  alignItems: "flex-start",
  backgroundColor: "rgba(0,0,0,0)",
  border: "none",
  outline: "none",
  cursor: "pointer",
  gap: 7,
}));

const Title = styled("div")(({ theme }) => ({
  color: "var(--black, #000)",
  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  alignSelf: "center",
  whiteSpace: "nowrap",
  margin: "auto 0",
  font: "600 24px Roboto, sans-serif",
  [theme.breakpoints.down("md")]: {
    whiteSpace: "initial",
  },
}));

const Navigation = styled("div")(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  width: 480,
  maxWidth: "100%",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 0,
  margin: "auto 0",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const NavItem = styled("a")(({ theme }) => ({
  color: "#000",
  alignSelf: "center",
  padding: "16px 20px",
  font: "700 18px Roboto, sans-serif",
  borderRadius: 10,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

const Auth = styled("div")(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  margin: "10px 0",
  alignItems: "flex-start",
  gap: 19,
}));

const Box = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "20px 10px",
  gap: 7,
  flexDirection: "row",
  alignItems: "center",
}));

const CustomAuthButton = styled("div")(({ theme }) => ({
  color: "var(--black, #000)",
  textAlign: "center",
  alignSelf: "stretch",
  whiteSpace: "nowrap",
  borderRadius: 10,
  backgroundColor: "var(--white, #fff)",
  boxShadow: theme.shadows[1],
  flex: 1,
  padding: "13px 36px 13px 37px",
  font: "700 16px Roboto, sans-serif",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  [theme.breakpoints.down("md")]: {
    whiteSpace: "initial",
    padding: "0 20px",
  },
}));

const ActiveAuthButton = styled(CustomAuthButton)(({ theme }) => ({
  // Additional primary styles here
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const AuthButton = ({ active = false, ...props }) => {
  if (active) {
    return <ActiveAuthButton {...props} />;
  }
  return <CustomAuthButton {...props} />;
};
