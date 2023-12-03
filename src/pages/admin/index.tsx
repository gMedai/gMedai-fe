import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalDisease } from "../../components/dashboard/total-disease";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { DashboardLayout } from "../../components/dashboard-layout";
import { CustomerResults } from "../../components/customer/customer-list";
import { CustomerToolbar } from "../../components/customer/customer-toolbar";
import { useState } from "react";
const Page = () => {
  const [customers, setCustomers] = useState([
    {
      fullName: "Nguyen Van A",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      location: "City, Country",
      dob: "1/11/2023",
      imageRemain: 0,
    },
    {
      fullName: "Nguyen Van B",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "Another City, Country",
      dob: "2/11/2023",
      imageRemain: 1000,
    },
    {
      fullName: "Nguyen Van C",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "Another City, Country",
      dob: "2/11/2023",
      imageRemain: 0,
    },
    {
      fullName: "Nguyen Van D",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      location: "Another City, Country",
      dob: "2/11/2023",
      imageRemain: 5000,
    },
  ]);

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalDisease sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={12} xs={12}>
              <Sales />
            </Grid>

            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: "100%" }} />
            </Grid>

            <Grid item lg={12} md={12} xl={12} xs={12}>
              <CustomerToolbar setCustomers={setCustomers} />
              <CustomerResults customers={customers} setCustomers={setCustomers} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout role={"admin"}>{page}</DashboardLayout>;

export default Page;
