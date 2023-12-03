import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { Add, ChevronRight, Delete, Download, ExpandMore, HdrPlus, PlusOne, Upload } from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/lab";
import StructureTreeView from "../components/structure/structure-tree-view";
import { StructureListToolbarAndModal } from "../components/structure/structure-list-toolbar-and-modal";

const Page = () => (
  <>
    <Head>
      <title>Organizational structure | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <StructureListToolbarAndModal/>
        <Box sx={{ mt: 3 }}>
          <StructureTreeView/>
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
