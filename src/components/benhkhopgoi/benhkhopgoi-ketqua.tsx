import React, { useCallback, useEffect, useState } from "react";
import { BenhKhopGoiSave } from "./benhkhopgoi-save";
import ImagePrintf from "../image/printf.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../utils/fontawesome";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BrandingWatermark, CenterFocusStrong } from "@mui/icons-material";
import { flexbox } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useAuthContext } from "../../contexts/auth-context";
const gt = [
  {
    value: "nam",
    label: "Nam",
  },
  {
    value: "nu",
    label: "Nữ",
  },
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
          size: 15,
        },
      },
    },
    x: {
      stacked: true,
      ticks: {
        font: {
          size: 15,
        },
      },
    },
  },
};

const labels = ["Bình thường", "Bị thoái hóa"];

export const BenhKhopGoiKetQua = (props) => {
  const authContext: any = useAuthContext();
  const isAuthenticated = authContext.isAuthenticated || false;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ClickImage, SetClickImage] = useState(1);
  const [Twoimage, setTwoImage] = useState(null);
  const [TwoResult, setTwoResult] = useState(null);
  const [file, setFile] = useState(null);
  const [urlimg, setURL] = useState(null);
  const [values, setValues] = useState({
    fullname: " ",
    sex: " ",
    dob: null,
    address: " ",
  });

  useEffect(() => {
    if (authContext.user) {
      setValues({
        ...values,
        fullname: authContext.user.first_name + " " + authContext.user.last_name,
        sex: authContext.user.gender,
      });
    }
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDate = (value) => {
    setValues({
      ...values,
      dob: value,
    });
  };

  const { data } = props;

  const dataVertialChart = {
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

  useEffect(() => {
    if (!data) {
      setTwoImage(null);
      setTwoResult(null);
      SetClickImage(1);
      return;
    }

    setTwoImage(data.image1);
    setTwoResult(data.result1);
    SetClickImage(1);
  }, [data]);
  let checkimg = 1;
  const handleClickChangeTwoImage = () => {
    data
      ? checkimg == 1
        ? (setTwoImage(data.image1), setTwoResult(data.result1), (checkimg = 2))
        : (setTwoImage(data.image2), setTwoResult(data.result2), (checkimg = 1))
      : "";
  };
  const handleClickChangeTwoImage2 = () => {
    data
      ? ClickImage == 1
        ? (setTwoImage(data.image2), setTwoResult(data.result2), SetClickImage(2))
        : (setTwoImage(data.image1), setTwoResult(data.result1), SetClickImage(1))
      : "";
  };

  return (
    <Card
      {...props}
      sx={{
        height: "auto",
        width: "100%",
        marginTop: "-28px",
        // backgroundColor:'#e9ecef'
      }}
    >
      <CardContent
        sx={{
          padding: "0 24px 24px 24px",
        }}
      >
        <Box sx={{}}>
          <Box component={"h4"} sx={{ margin: "16px 0", padding: "0", textAlign: "center" }}>
            Kết quả chuẩn đoán
          </Box>
          <Box
            sx={{
              border: data ? "0px solid #25A1E7" : "3px solid #25A1E7",
              borderRadius: "10px",
              height: " 20vw",
              padding: "4px 10px 0 5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Bar options={options} data={dataVertialChart} />
          </Box>
        </Box>
      </CardContent>
      <Divider />

      <CardContent sx={{ paddingTop: "16px" }}>
        <Typography
          color="textSecondary"
          variant="body2"
          fontSize={16}
          flexGrow={1}
          align="center"
          sx={{ paddingBottom: "16px", fontWeight: "bold" }}
        >
          Infomation User
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="fullname"
          onChange={handleChange}
          type="string"
          value={values.fullname}
          variant="outlined"
          required
          sx={{ fontSize: "100%", marginBottom: "16px" }}
        />
        <Grid container spacing={3}>
          <Grid item md={5} xs={5}>
            <TextField
              fullWidth
              label="Giới tính"
              name="sex"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.sex}
              variant="outlined"
            >
              {gt.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item md={7} xs={7}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of birth"
                value={values.dob}
                onChange={(newValue) => handleChangeDate(newValue)}
                renderInput={(props) => <TextField {...props} />}
                InputAdornmentProps={{ position: "end" }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Place of residence"
          name="address"
          onChange={handleChange}
          type="string"
          value={values.address}
          variant="outlined"
          required
          sx={{ fontSize: "100%", marginTop: "16px", marginBottom: "16px" }}
          multiline
        />
        <Button
          color="success"
          onClick={handleOpen}
          variant="contained"
          sx={{
            width: "60px",
            height: "50px",
            margin: "auto",
            display: "block",
          }}
          fullWidth
        >
          <FontAwesomeIcon icon="print" size="lg" />
        </Button>
      </CardContent>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#ffffff",
        }}
      >
        <BenhKhopGoiSave data={data} />
      </Modal>
    </Card>
  );
};
