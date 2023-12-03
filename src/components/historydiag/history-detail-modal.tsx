import React, { useState } from "react";
import { Box, Modal, Typography, Paper, Grid, Button, Card, CardMedia } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Divider from "@mui/material/Divider";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { ModalZoomImage } from "./history-zoomimage";
export const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: "top" as const,
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        font: {
          size: 13,
        },
      },
    },
    x: {
      stacked: true,
      ticks: {
        font: {
          size: 13,
        },
      },
    },
  },
};

const labels = ["Bình thường", "Bị thoái hóa"];
export const HistoryDetailModal = ({ histotyItem, onClose }) => {
  const createDataVerticalChart = (TwoResult) => {
    return {
      labels,
      datasets: [
        {
          data: [100 - TwoResult * 100, 0],
          backgroundColor: "#25A1E7",
        },
        {
          data: [0, TwoResult * 100],
          backgroundColor: "#042996",
        },
      ],
    };
  };

  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);

  const handleImageClick = (imageUrl) => {
    setZoomedImageUrl(imageUrl);
  };

  const handleZoomModalClose = () => {
    setZoomedImageUrl(null);
  };

  return (
    <Modal open={!!histotyItem} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: "16px 32px",
          maxWidth: 600,
        }}
      >
        {/* Thêm các thông tin bạn muốn hiển thị */}
        <Typography variant="h5" align="center" gutterBottom>
          History Details
        </Typography>
        <Divider sx={{ height: "2px", background: "#10B981", marginBottom: "8px" }} />

        <Grid container spacing={2}>
          {/* Hiển thị ảnh tải lên */}
          <Grid item lg={12} xs={12} md={12}>
            <Typography variant="h6" sx={{ marginBottom: "8px" }}>
              Upload Image
            </Typography>
            <Card
              sx={{ boxShadow: "none" }}
              onClick={() => handleImageClick(histotyItem?.uploadedImageUrl)}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "200px",
                  height: "150px",
                  cursor: "pointer",
                }}
                alt="Uploaded Image"
                src={histotyItem?.uploadedImageUrl}
              />
            </Card>
          </Grid>

          <Grid item lg={12} xs={12} md={12}>
            <Divider sx={{ height: "2px", background: "#10B981", margin: "12px 0" }} />

            <Typography variant="h6" sx={{ marginBottom: "8px" }}>
              Result Diagnose
            </Typography>
            {histotyItem?.resultImages.map((resultImage, index) => (
              <Box key={index} mb={2} sx={{ display: "flex" }}>
                <Card onClick={() => handleImageClick(resultImage.imageUrl)}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: "200px",
                      height: "150px",
                      cursor: "pointer",
                    }}
                    alt={`Result Image ${index + 1}`}
                    src={resultImage.imageUrl}
                  />
                </Card>
                <Box sx={{ marginLeft: "20px", height: "150px" }}>
                  <Bar options={options} data={createDataVerticalChart(resultImage.rate || 0)} />
                </Box>
              </Box>
            ))}
          </Grid>
          {zoomedImageUrl && (
            <ModalZoomImage imageUrl={zoomedImageUrl} onClose={handleZoomModalClose} />
          )}
        </Grid>
        {/* Thêm nút đóng modal */}
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};
