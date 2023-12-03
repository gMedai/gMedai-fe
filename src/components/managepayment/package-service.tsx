import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useState } from "react";
export const PackageService = () => {
  const packagesData = [
    {
      serviceName: "Package 1",
      imageCount: 100,
      amount: 100,
      type: "byimage",
    },
    {
      serviceName: "Package 2",
      imageCount: 200,
      amount: 190,
      type: "byimage",
    },
    {
      serviceName: "Package 3",
      imageCount: 300,
      amount: 280,
      type: "byimage",
    },
    {
      serviceName: "Package 4",
      imageCount: 400,
      amount: 370,
      type: "byimage",
    },
    {
      serviceName: "Package 5",
      time: "week",
      amount: 500,
      type: "bytime",
    },
    {
      serviceName: "Package 6",
      time: "month",
      amount: 1700,
      type: "bytime",
    },
    {
      serviceName: "Package 7",
      time: "year",
      amount: 10000,
      type: "bytime",
    },
  ];

  const PackageCard = ({ packageInfo }) => {
    return (
      <Card
        sx={{
          background: "linear-gradient(to right, #00B4DB, #0083b0)",
          margin: "8px 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          color: "#fff",
          height: "180px",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 16, textAlign: "center" }} component="div">
            {packageInfo.serviceName}
          </Typography>
          <Typography
            sx={{
              fontSize: 30,
              marginTop: 2,
              textAlign: "center",
              fontWeight: "800",
              color: "#fff",
            }}
            color="textSecondary"
          >
            <Typography
              component="span"
              sx={{ fontSize: 18, verticalAlign: "top", fontWeight: "200", paddingRight: "8px" }}
            >
              $
            </Typography>

            {packageInfo.amount}
          </Typography>
          <Divider sx={{ marginTop: 1 }} />
          <Typography
            sx={{ fontSize: 14, marginTop: 2, textAlign: "center", color: "#fff" }}
            color="textSecondary"
          >
            {packageInfo.type === "byimage" && <>{packageInfo.imageCount} images</>}
            {packageInfo.type === "bytime" && <>1 {packageInfo.time}</>}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const [selectedPackageType, setSelectedPackageType] = useState("All");

  const filterPackages = (event) => {
    setSelectedPackageType(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ maxWidth: "200px" }} fullWidth>
        <InputLabel id="package-type-label">Package Type</InputLabel>
        <Select
          labelId="package-type-label"
          id="package-type-select"
          value={selectedPackageType}
          label="Package Type"
          onChange={filterPackages}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="bytime">By Time</MenuItem>
          <MenuItem value="byimage">By Image</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {packagesData
          .filter((packageInfo) => {
            if (selectedPackageType === "All") return true;
            return packageInfo.type === selectedPackageType;
          })
          .map((packageInfo, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <PackageCard key={index} packageInfo={packageInfo} />
            </Grid>
          ))}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              background: "#f5f5f5",
              margin: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              padding: "16px",
              cursor: "pointer",
              flexDirection: "column",
            }}
          >
            <ControlPointIcon style={{ fontSize: "40px", marginBottom: "16px" }} />
            <span style={{ fontSize: "13px" }}>Add package service</span>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
