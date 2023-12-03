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
  // Ngày 25/11
  {
    id: uuid(),
    timeDiag: new Date("2023-11-25T00:00:00"),
    result: "Normal",
    rate: 80,
  },
  // Thêm 19 đối tượng khác cho ngày 25/11

  // Ngày 26/11
  {
    id: uuid(),
    timeDiag: new Date("2023-11-26T00:00:00"),
    result: "Normal",
    rate: 85,
  },
  // Thêm 19 đối tượng khác cho ngày 26/11

  // Ngày 27/11
  {
    id: uuid(),
    timeDiag: new Date("2023-11-27T00:00:00"),
    result: "Normal",
    rate: 78,
  },
  // Thêm 19 đối tượng khác cho ngày 27/11

  // Ngày 28/11
  {
    id: uuid(),
    timeDiag: new Date("2023-11-28T00:00:00"),
    result: "Normal",
    rate: 75,
  },

  // Ngày 29/11
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T00:00:00"),
    result: "Normal",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T01:00:00"),
    result: "Degenerate",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T02:00:00"),
    result: "Degenerate",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T03:04:00"),
    result: "Normal",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T04:04:58"),
    result: "Degenerate",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T05:14:13"),
    result: "Normal",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T06:08:08"),
    result: "Normal",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T08:08:07"),
    result: "Normal",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-29T09:09:09"),
    result: "Degenerate",
    rate: 75,
  },
  {
    id: uuid(),
    timeDiag: new Date("2023-11-30T15:09:09"),
    result: "Degenerate",
    rate: 80,
    uploadedImageUrl:
      "https://bone.vn/wp-content/uploads/2020/08/hinh-anh-x-quang-thoai-hoa-khop-goi-1-min.jpg",

    resultImages: [
      {
        imageUrl:
          "https://media.vneconomy.vn/images/upload/2021/05/17/185845115-310393400545356-5432741184686865255-n.jpg",
        rate: 0.792,
      },
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Hb-loqEh20R33LnfGVo6-PxnpSpyQFIYJ1cRl3D8XK23qmiWbSmQh4ESWrbt2lp---E&usqp=CAU",
        rate: 0.992,
      },
    ],
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
