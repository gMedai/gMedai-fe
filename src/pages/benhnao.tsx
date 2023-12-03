import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { BenhNaoUploadImage } from '../components/benhnao/benhnao-uploadimage';
import { BenhNaoKetQua } from '../components/benhnao/benhnao-ketqua';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';

const Page = () => {
  const [data, SetData] = useState('');

  const handleImageChange = (data) => {
    SetData(data);
  }
  const datares = data ? data : null;
  return (
  <>
    <Head>
      <title>
      Bệnh não | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        paddingTop: '0px'
      }}
    >
      <Container maxWidth={false}>
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Bệnh não
        </Typography>
        <Grid 
          container
          spacing={3}
          
        >
          <Grid                       // go
            item
            lg={6}
            md={6}
            xs={12}
          
          >
            <BenhNaoUploadImage   handleImageChange={handleImageChange}/>
          </Grid>
          <Grid
            item
            lg={0}
            md={6}
            xs={12}
          >
          <BenhNaoKetQua data={datares}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
