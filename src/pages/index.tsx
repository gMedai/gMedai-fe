import Head from "next/head";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { useAuthContext } from "../contexts/auth-context";
import { textAlign } from "@mui/system";

const Page = ({ currentTenant }) => {

  const tenantInfo = [
    {
      tenantId: "1",
      tenantName: "Nguyen Tri Phương Hospital",
      introduction:
        "Situated in the heart of Ho Chi Minh City, Nguyễn Tri Phương Hospital has established its name in the healthcare sector. It is not only a treatment center but also a prestigious address for renowned doctors and healthcare professionals. With a multidisciplinary team of doctors, Nguyễn Tri Phương Hospital takes care of patients comprehensively and compassionately.",
      imageURL:
        "https://thuocdantoc.vn/wp-content/uploads/2019/01/benh-vien-nguyen-tri-phuong1.jpg",
      contact: {
        email: "triphuong@hcm.vnn.vn",
        address: "468 D. Nguyen Trai, Phuong 8, Quan 5, TP.HCM",
        phone: "02839234332",
        website: "https://bvnguyentriphuong.com.vn/",
      },
    },
    {
      tenantId: "2",
      tenantName: "Cho Ray Hospital",
      introduction:
        "Cho Ray Hospital, located in Ho Chi Minh City, is one of the largest and most reputable medical facilities in Vietnam. With over a century of operation, Cho Ray Hospital continuously enhances service quality, invests in modern medical technology, and builds a highly skilled team of doctors and nurses. Cho Ray Hospital provides a comprehensive range of medical services, from basic healthcare to advanced treatment methods.",
      imageURL:
        "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/benh_vien_cho_ray_d01ba2a25b.jpg",
      contact: {
        email: "bvchoray@choray.vn",
        address: "201B D. Nguyen Chi Thanh, Phuong 12, Quan 5, TP.HCM",
        phone: "02838554138",
        website: "http://choray.vn/",
      },
    },
    {
      tenantId: "3",
      tenantName: "115 People's Hospital",
      introduction:
        "115 People's Hospital is one of the leading medical facilities in Ho Chi Minh City and an important public hospital in Vietnam. Equipped with modern medical devices, 115 People's Hospital ensures the delivery of quality and diverse healthcare services, meeting the increasing healthcare needs of the community.",
      imageURL: "https://benhvien115.com.vn/data/cover-home_mobile-1.jpg",
      contact: {
        email: "bvnd115@hcm.fpt.vn",
        address: "25 D. Su Van Hanh, Phưong 12, Quan 10, TP.HCM",
        phone: "1900099983",
        website: "https://benhvien115.com.vn/intro",
      },
    },
    {
      tenantId: "4",
      tenantName: "Orthopedic Clinic - Dr. Che Thanh Doan",
      introduction:
        "Managed by Dr. Che Thanh Doan, the Orthopedic Clinic specializes in treating disorders related to bones and joints. With years of experience and professional dedication, Dr. Che Thanh Doan and the medical team at the clinic provide patients with dedicated, professional, and effective treatment.",
      imageURL:
        "https://phongkhambacsi.vn/wp-content/uploads/gh-img-blog/phong-kham-bac-si-che-thanh-doan-536.jpg",
      contact: {
        email: "",
        phone: "0914288599",
        address: "134A Xom Dat, Phuong 8, Quan 11, TP.HCM",
        website: "",
      },
    },
    {
      tenantId: "5",
      tenantName: "University Medical Center, Ho Chi Minh City",
      introduction:
        "Ho Chi Minh City University of Medicine and Pharmacy Hospital, also known as HCUMPH Hospital, stands as one of the leading healthcare institutions in Ho Chi Minh City, delivering reputable healthcare services. Situated within the premises of Ho Chi Minh City University of Medicine and Pharmacy",
      imageURL:
        "https://ibaohiem.vn/wp-content/uploads/2023/04/Benh-vien-Y-duoc-TPHCM.jpg",
      contact: {
        email: "",
        phone: "(+84-28) 3855 4269",
        address: "215 Hong Bang, P11, Q5, TPHCM",
        website: "",
      },
    },
  ];
  const authContext: any = useAuthContext();

  const tenantId = authContext.tenantId || "1";
  const selectedTenant = tenantInfo.find((tenant) => tenant.tenantId === tenantId);

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          py: 1,
        }}
      >
      
        <Container maxWidth={false}>
          {selectedTenant ? (
            <Paper elevation={2} sx={{ padding: 1, textAlign: "center" }}>
              <Typography variant="h3" gutterBottom>
                {selectedTenant.tenantName}
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <Typography sx={{ textIndent: "24px", fontSize: "18px", textAlign: "justify" }}>
                  {selectedTenant.introduction}
                </Typography>
              </Box>
              <Grid container spacing={5} sx={{ padding: "0 16px" }}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedTenant.imageURL}
                    alt={selectedTenant.tenantName}
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "300px",
                      marginBottom: "16px",
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ marginTop: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      Contact
                    </Typography>
                    <Box sx={{ textAlign: "left", padding: "16px 24px" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ marginRight: "8px" ,minWidth: "100px"}}>
                          Phone:
                        </Typography>
                        <Typography>{selectedTenant.contact.phone}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ marginRight: "8px" , minWidth: "100px"}}>
                          Email:
                        </Typography>
                        <Typography>{selectedTenant.contact.email}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ marginRight: "8px" , minWidth: "100px"}}>
                          Address:
                        </Typography>
                        <Typography>{selectedTenant.contact.address}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ marginRight: "8px" , minWidth: "100px"}}>
                          Page:
                        </Typography>
                        <Typography>
                          <a href={selectedTenant.contact.website}>
                            {selectedTenant.contact.website}
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ) : <Box sx = {{fontSize: "20px",width: "100%", padding: "32px 0", textAlign: "center"}}>
            Please select partner on the <b style = {{padding: "0 10px"}}>Register service</b> page
          </Box>}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
