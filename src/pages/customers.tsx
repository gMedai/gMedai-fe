import Head from "next/head";
import { Box, Container, Modal } from "@mui/material";
import { CustomerResults } from "../components/customer/customer-list";
import { CustomerToolbar } from "../components/customer/customer-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import React, { useState } from "react";

const Page = ({ users }) => {
  const [customers, setCustomers] = useState(users);
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
        <Container maxWidth={false}>
          <CustomerToolbar setCustomers={setCustomers} />
          <CustomerResults customers={customers} setCustomers={setCustomers} />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getStaticProps() {
  return {
    props: { users: [] },
  };
}
