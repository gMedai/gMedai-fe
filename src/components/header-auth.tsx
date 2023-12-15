import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { Box } from "@mui/material";
const HeaderBarAuth = () => {
  return (
    <Box sx={{ position: "fixed", top: 24, left: 24 }}>
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
    </Box>
  );
};

export default HeaderBarAuth;

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
