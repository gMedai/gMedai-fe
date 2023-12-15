import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import NextLink from "next/link";

export const LandingPageIntroduce = (props) => {
  
  return (
    <>
      <Grid container spacing={5} sx={{ padding: "16px 32px" }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", padding:"8px 16px" }}>
            <Typography
              variant="h2"
              sx={{
                color: "#000",
                alignSelf: "start",
                fontWeight: 650,
                fontSize: { xs: "24px", md: "32px" },
                maxWidth: "100%",
              }}
            >
              KNEE JOINT DISEASE - Knowledge you need to know
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#000",
                textAlign: "justify",
                alignSelf: "start",
                marginTop: "16px",
                fontWeight: 400,
                fontSize: "20px",
                maxWidth: "100%",
                marginRight: "24px",
                textIndent: "32px"
              }}
            >
              Knee joint disease, also known as knee joint inflammation, is a common condition that
              affects millions of people worldwide. This is a serious health issue that can make
              daily activities and mobility challenging. This website provides detailed information
              about the causes, symptoms, and treatment of knee joint disease, helping you gain a
              better understanding of this condition and seek solutions for your health. Lets
              explore and share knowledge to cope with knee joint disease together.
            </Typography>

            <StyledButton sx = {{background: "linear-gradient(to right, #9083D5, #807593)", color: "#fff"}}>View detail</StyledButton>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box>
            <Image
              className="image"
              loading="lazy"
              src="/static/images/introduce.png"
              width={900}
              height={550}
              alt="Knee Joint Disease"
              style={{
                aspectRatio: "1.62",
                objectFit: "contain",
                objectPosition: "center",
                width: "100%",
                overflow: "hidden",
                flexGrow: 1,
                maxWidth: "100%",
                marginTop: 15,
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ padding: "0 20px" }}>
        <Grid item xs={12} md={6}>
          <Box>
            <Image
              className="image"
              loading="lazy"
              src="/static/images/introduce2.png"
              width={700}
              height={500}
              alt="Who we are"
              style={{
                aspectRatio: "1.62",
                objectFit: "contain",
                objectPosition: "center",
                width: "100%",
                overflow: "hidden",
                flexGrow: 1,
                maxWidth: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h2"
              sx={{
                color: "#000",
                alignSelf: "start",
                fontWeight: 500,
                fontSize: { xs: "24px", md: "32px" },
                maxWidth: "100%",
                marginTop: "16px"
              }}
            >
              Who we are
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#000",
                textAlign: "justify",
                alignSelf: "start",
                marginTop: "16px",
                fontWeight: 400,
                fontSize: "20px",
                maxWidth: "100%",
                marginRight: "24px",
                textIndent: "32px"
              }}
            >
              We are a team of passionate students from Bach Khoa University who have come together
              to develop gMedAI, a groundbreaking medical imaging platform. Our mission is to make
              healthcare more accessible and convenient by harnessing the potential of artificial
              intelligence in medical diagnostics. With gMedAI, you can easily upload your medical
              images and receive accurate diagnostic results. Join us on our journey to
              revolutionize the world of healthcare and empower individuals with the knowledge they
              need for a healthier life.
            </Typography>

            <StyledButton sx = {{background: "linear-gradient(to right, #9083D5, #807593)", color: "#fff"}}>View detail</StyledButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  width: "171px",
  alignSelf: "stretch",
  whiteSpace: "nowrap",
  borderRadius: 15,
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
  padding: "13px 43px 10px 40px",
  marginTop: 40,
}));
