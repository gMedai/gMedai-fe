import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalDisease } from "../../components/dashboard/total-disease";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { DashboardLayout } from "../../components/dashboard-layout";
import { CustomerResults } from "../../components/tenant/tenant-list";
import { CustomerToolbar } from "../../components/tenant/tenant-toolbar";
import { useState } from "react";
const Page = () => {
  const [customers, setCustomers] = useState([
    {
      fullName: "Nguyen Tri Phương Hospital",
      email: "triphuong@hcm.vnn.vn",
      phone: "02839234332",
      location: "468 D. Nguyen Trai, P8, Quan 5, TP.HCM",
      website: "bvnguyentriphuong.com.vn/",
      imageRemain: 0,
    },
    {
      fullName: "Cho Ray Hospital",
      email: "bvchoray@choray.vn",
      phone: "02838554138",
      location: "201B D. Nguyen Chi Thanh, Phuong 12, Quan 5, TP.HCM",
      website: "choray.vn/",
      imageRemain: 1000,
    },
    {
      fullName: "Orthopedic Clinic - Dr. Che Thanh Doan",
      email: "none",
      phone: "0914288599",
      location: "134A Xom Dat, Phuong 8, Quan 11, TP.HCM",
      website: "none",
      imageRemain: 0,
    },
    {
      fullName: "115 People's Hospital",
      email: "bvnd115@hcm.fpt.vn",
      phone: "1900099983",
      location: "25 D. Su Van Hanh, Phưong 12, Quan 10, TP.HCM",
      website: "benhvien115.com.vn/intro",
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
