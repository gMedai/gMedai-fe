import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { BenhKhopGoiUploadImage } from "../../components/benhkhopgoi/benhkhopgoi-uploadimage";
import { BenhKhopGoiKetQua } from "../../components/benhkhopgoi/benhkhopgoi-ketqua";
import { BenhKhopGoiResult } from "../../components/benhkhopgoi/benhkhopgoi-result";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useState } from "react";

const Page = () => {
  const [data, SetData] = useState("");

  const handleImageChange = (data) => {
    SetData(data);
  };
  const datares = data ? data : null;
  return (
    <>
      <Head>
        <title>Bệnh khớp gối | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          paddingTop: "0px",
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ mb: 3 }} variant="h4">
            Knee Osteoarthritis Diagnosis
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} xs={12}>
              <BenhKhopGoiUploadImage handleImageChange={handleImageChange} />
            </Grid>
            <Grid item lg={4} md={8} xs={12}>
              <BenhKhopGoiKetQua data={datares} />
              {/* <BenhKhopGoiResult data={datares} /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout role={"tenant"}>{page}</DashboardLayout>;

export default Page;
