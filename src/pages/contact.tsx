import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>About | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Trang liên hệ
        </Typography>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
