import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  TextField,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { HistoryDetailModal } from "./history-detail-modal";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const historys = [
  {
    id: uuid(),
    timeDiag: new Date(new Date().setHours(15, 9, 9, 0) - 24 * 60 * 60 * 1000),
    result: "Degenerate",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date(new Date().setHours(14, 9, 9, 0) - 24 * 60 * 60 * 1000),
    result: "Degenerate",
    rate: 75,
  },

  {
    id: uuid(),
    timeDiag: new Date(),
    result: "Degenerate",
    rate: 90,
    uploadedImageUrl: "/static/images/historydiagnose/upload2.png",

    resultImages: [
      {
        imageUrl: "/static/images/historydiagnose/result21.png",
        rate: 0.9,
      },
      {
        imageUrl: "/static/images/historydiagnose/result22.png",
        rate: 0.9,
      },

    ],
  },
  {
    id: uuid(),
    timeDiag: new Date(new Date().setHours(8, 9, 9)),
    rate: 95,
    result: "Degenerate",
    uploadedImageUrl: "/static/images/historydiagnose/upload1.png",
    resultImages: [
      {
        imageUrl: "/static/images/historydiagnose/result1.png",
        rate: 0.9,
      },
    ]

  },
  {
    id: uuid(),
    timeDiag: new Date(new Date().setHours(6, 9, 9)),
    result: "Normal",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date(new Date().setHours(5, 9, 9)),
    result: "Normal",
    rate: 75,
  },
];
export const HistoryList = (props: CardProps) => {
  const [selectedHistoryItem, setselectedHistoryItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterData, setFiterData] = useState([]);
  useEffect(() => {
    const filteredData = historys.filter((item) => {
      const historyDate = new Date(item.timeDiag);
      return (
        historyDate.getDate() === selectedDate.getDate() &&
        historyDate.getMonth() === selectedDate.getMonth() &&
        historyDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    setFiterData(filteredData);
  }, []);

  const handleChangeDate = (value) => {
    setSelectedDate(new Date(value));
  };

  useEffect;

  const handleFilterClick = () => {
    if (selectedDate && selectedDate instanceof Date) {
      // Lọc dữ liệu theo ngày đã chọn
      const filteredData = historys.filter((item) => {
        const historyDate = new Date(item.timeDiag);
        return (
          historyDate.getDate() === selectedDate.getDate() &&
          historyDate.getMonth() === selectedDate.getMonth() &&
          historyDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      setFiterData(filteredData);
    } else {
      console.error("Please choose a valid date before filtering.");
    }
  };

  const handleViewDetail = (item) => {
    setselectedHistoryItem(item);
  };

  const handleCloseModal = () => {
    setselectedHistoryItem(null);
  };

  return (
    <Card {...props}>
      <CardHeader title="History Diagnostic" />
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2, maxWidth: 500 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Filter by Time Diagnostic"
            value={selectedDate}
            onChange={(newValue) => handleChangeDate(newValue)}
            renderInput={(props) => <TextField {...props} />}
            InputAdornmentProps={{ position: "end" }}
          />
        </LocalizationProvider>
        <Button
          sx={{ marginLeft: "32px", padding: "0 32px" }}
          variant="contained"
          color="success"
          onClick={handleFilterClick}
        >
          Filter
        </Button>
      </Box>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Time Diagnostion</TableCell>

                <TableCell>Result</TableCell>
                <TableCell>Rate (%)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {filterData.length > 0 ? (
              <TableBody>
                {filterData.map((histotyItem, index) => (
                  <TableRow hover key={histotyItem.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{format(histotyItem.timeDiag, "MM/dd/yyyy HH:mm:ss")}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={(histotyItem.result === "Normal" && "success") || "error"}
                      >
                        {histotyItem.result}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{histotyItem.rate}%</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        onClick={() => handleViewDetail(histotyItem)}
                      >
                        View Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <div>No history diagnoses</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>
      {filterData.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      )}
      {/* Modal for View Detail */}
      <HistoryDetailModal histotyItem={selectedHistoryItem} onClose={handleCloseModal} />
    </Card>
  );
};
