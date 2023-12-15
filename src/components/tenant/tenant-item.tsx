import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import UndoIcon from "@mui/icons-material/Undo";
import { SeverityPill } from "../severity-pill";

export function CustomerItem({ customer, selected }) {
  return (
    <TableRow hover key={customer.id} selected={selected}>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Avatar src="/static/images/avatars/avatar_3.png" sx={{ mr: 2 }}>
            {getInitials(customer.fullName)}
          </Avatar>
          <Typography sx= {{fontSize: "13px"}} color="textPrimary">
            {customer.fullName}
          </Typography>
        </Box>
      </TableCell>
      <TableCell sx= {{fontSize: "13px"}}>{customer.email}</TableCell>
      <TableCell sx= {{fontSize: "13px"}}>{customer.phone}</TableCell>
      <TableCell sx= {{fontSize: "13px"}} align="right">{customer.location}</TableCell>
      <TableCell sx= {{fontSize: "13px"}} align="right">{customer.website}</TableCell>

      <TableCell sx={{ color: "", fontWeight: 500 }} align="right">
        <SeverityPill color={(customer.imageRemain === 0 && "error") || "success"}>
          {customer.imageRemain}
        </SeverityPill>
      </TableCell>
    </TableRow>
  );
}
