import React, { useRef, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { userService } from "@services/userService";
import { CustomerItem } from "./customer-item";

export const CustomerResults = ({ customers, setCustomers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const canvasRef = useRef();

  const handleSelectOne = (event, id: any) => {
    if (event.target.checked) return setSelectedCustomerIds([...selectedCustomerIds, id]);
    setSelectedCustomerIds(selectedCustomerIds.filter((x) => x != id));
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRemoveOneUser = (customerId) => {
    userService.delete(customerId);
    const custom = customers.filter((cur) => cur.id !== customerId);
    setCustomers(custom);
  };

  function NameColum() {
    return (
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Location</TableCell>
        <TableCell align="center">Date Of Birth</TableCell>
        <TableCell align="center">Image remain</TableCell>
      </TableRow>
    );
  }

  return (
    <Card sx={{ mt: 3 }} {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <NameColum />
            </TableHead>

            <TableBody>
              {customers.slice(0, limit).map((customer) => {
                return (
                  <CustomerItem
                    key={customer.id}
                    customer={customer}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  />
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
