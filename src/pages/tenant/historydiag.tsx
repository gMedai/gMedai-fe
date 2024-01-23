import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../../components/dashboard/budget";
import { HistoryList } from "../../components/historydiag/history-list";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { TrafficByDevice } from "../../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../../components/dashboard-layout";

const Page = () => (
  <>
    <Head>
      <title>Dashboard | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container>
        <HistoryList />
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout role={"tenant"}>{page}</DashboardLayout>;

export default Page;
