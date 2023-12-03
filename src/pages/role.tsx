import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { RoleListToolbar } from "../components/role/role-list-toolbar";
import { RoleListResults } from "../components/role/role-list-results";

const Page = () => (
  <>
    <Head>
      <title>Role | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <RoleListToolbar />
        <Box sx={{ mt: 3 }}>
          <RoleListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
