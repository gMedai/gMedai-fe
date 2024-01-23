import { LandingPageIntroduce } from "@components/landingpage/landingpage-introduce";
import { LandingPageNavbar } from "@components/landingpage/landingpage-navbar";
import { Box, Container, Grid } from "@mui/material";
import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>Welcome to DiagHub</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
        }}
      >
        <LandingPageNavbar />

        <Box
          sx={{
            px: 2,
            my: 2,
          }}
        >
          <LandingPageIntroduce />
        </Box>
      </Box>
    </>
  );
};

export default Page;
