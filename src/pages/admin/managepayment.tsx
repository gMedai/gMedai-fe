import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Box } from "@mui/material";
import { ManagePayment } from "@components/managepayment/managepayment";
const Page = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      ></Box>
      <ManagePayment />
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout role={"admin"}>{page}</DashboardLayout>;

export default Page;
