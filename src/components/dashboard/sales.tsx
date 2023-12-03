import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Container, Typography, Menu, MenuItem } from "@mui/material";
export const Sales = (props) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRange, setSelectedRange] = useState("Last 12 months");

  const handleRangeSelect = (range) => {
    console.log("Selected Range:", range);
    setSelectedRange(range);
    setAnchorEl(null);
  };

  const handleButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: "This year",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#EEEEEE",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: "Last year",
        maxBarThickness: 10,
      },
    ],
    labels: ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug", "7 aug"],
  };

  const options: any = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1000, 1200, 800, 1500, 1100, 900, 1300, 1000, 1400, 1200, 1600, 1800],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          <React.Fragment>
            <Button
              endIcon={<ArrowDropDownIcon fontSize="small" />}
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {selectedRange}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => handleRangeSelect("Last 7 days")}>Last 7 days</MenuItem>
              <MenuItem onClick={() => handleRangeSelect("Last 15 days")}>Last 15 days</MenuItem>
              <MenuItem onClick={() => handleRangeSelect("Last 1 month")}>Last 1 month</MenuItem>
              <MenuItem onClick={() => handleRangeSelect("Last 6 months")}>Last 6 months</MenuItem>
              <MenuItem onClick={() => handleRangeSelect("Last 12 months")}>
                Last 12 months
              </MenuItem>
            </Menu>
          </React.Fragment>
        }
        title="Latest Revenues"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          {/* <Bar data={data} options={options} />
           */}
          <Line data={revenueData} />
        </Box>
      </CardContent>
      <Divider />
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
          Overview
        </Button>
      </Box> */}
    </Card>
  );
};
