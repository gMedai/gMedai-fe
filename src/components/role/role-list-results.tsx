import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export const RoleListResults = ({ ...rest }) => {
    const [role, setRole] = useState([
        { id: "001", name: "Admin", role: "1" }, 
        { id: "002", name: "Admin 2", role: "2" }, 
        { id: "003", name: "Admin 3", role: "3" },
        { id: "004", name: "User", role: "4" }

    ])
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [buttonDelete, setButtonDelete] = useState(false);
    const [selcect, setSelect] = useState(0);
    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;

        if (event.target.checked) {
            newSelectedCustomerIds = role.map((customer) => customer.id);
        } else {
            newSelectedCustomerIds = [];
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleSelectOne = (event, id: any) => {
        const selectedIndex = selectedCustomerIds.indexOf(id);
        let newSelectedCustomerIds = [];

        if (selectedIndex === -1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, selectedIndex),
                selectedCustomerIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    // const handleLimitChange = (event) => {
    //     setLimit(event.target.value);
    // };

    // const handlePageChange = (event, newPage) => {
    //     setPage(newPage);
    // };

    const removeRole = (id) => {
        alert(id);
        const custom = role.filter((index) => index.id != id);
        setRole(custom);
    };
    return (
        <Card {...rest}>
            <Box sx={{ minWidth: 1050 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedCustomerIds.length === role.length}
                                    color="primary"
                                    indeterminate={
                                        selectedCustomerIds.length > 0 &&
                                        selectedCustomerIds.length < role.length
                                    }
                                    onChange={(event) => {
                                        handleSelectAll(event)
                                    }}
                                />
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>role</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {role.slice(0, limit).map((value) => (
                            <TableRow
                                hover
                                key={value.id}
                                selected={selectedCustomerIds.indexOf(value.id) !== -1}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedCustomerIds.indexOf(value.id) !== -1}
                                        onChange={(event) => {
                                            handleSelectOne(event, value.id)
                                        }}
                                        value="true"
                                    />
                                </TableCell>
                                <TableCell>{value.name}</TableCell>
                                <TableCell>{value.role}</TableCell>
                                <TableCell>
                                    <Button variant="text" color="error" onClick={() => removeRole(value.id)}>
                                        <Delete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

