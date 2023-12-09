import Head from "next/head";
import { Box, Container, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import { CustomerResults } from "@components/customer/customer-list";
import { CustomerToolbar } from "@components/customer/customer-toolbar";
import { DashboardLayout } from "@components/dashboard-layout";
import { Budget } from "@components/dashboard/budget";
import { LatestOrders } from "@components/dashboard/latest-orders";
import { LatestProducts } from "@components/dashboard/latest-products";
import { Sales } from "@components/dashboard/sales";
import { TasksProgress } from "@components/dashboard/tasks-progress";
import { TotalCustomers } from "@components/dashboard/total-customers";
import { TotalProfit } from "@components/dashboard/total-profit";
import { TrafficByDevice } from "@components/dashboard/traffic-by-device";
import { RemainImg } from "@components/dashboard/remain-img";

// data for demo
const usersData = [
  {
    id: 1,
    fullName: "User 1",
    email: "user1@gmail.com",
    phone: "123456789",
    location: "Ha Noi",
    dob: "2021-10-10",
    imageRemain: 10,
  },
  {
    id: 2,
    fullName: "User 2",
    email: "user2@gmail.com",
    phone: "123456789",
    location: "Ha Noi",
    dob: "2021-10-10",
    imageRemain: 10,
  },
  {
    id: 3,
    fullName: "User 3",
    email: "user3@gmail.com",
    phone: "123456789",
    location: "Ha Noi",
    dob: "2021-10-10",
    imageRemain: 10,
  },
];

const Page = () => {
  const [users, setUsers] = useState(usersData);

  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Sales />
          </Grid>
          <Grid item container spacing={3} direction="row" xs={4}>
            <Grid item xs={12}>
              <RemainImg sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12}>
              <TotalProfit sx={{ height: "100%" }} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth={false}>
              <CustomerToolbar setCustomers={setUsers} />
              <CustomerResults customers={users} setCustomers={setUsers} />
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout role={"tenant"}>{page}</DashboardLayout>;

export default Page;
