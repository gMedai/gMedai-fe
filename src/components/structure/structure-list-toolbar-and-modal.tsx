import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
    Modal,
    Container,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import React, { useState } from "react";
import { StructureAdd } from "./structure-add";

export const StructureListToolbarAndModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
            }}
        >
            <Typography sx={{ mb: 3 }} variant="h4">
                Organizational structure
            </Typography>
            <Box sx={{ m: 1 }}>
                <Button onClick={handleOpen} color="primary" variant="contained" sx={{ marginRight: 1 }} startIcon={<Add />}>
                    Add Structure
                </Button>
                <Button variant="contained" startIcon={<Delete />} color="error">
                    Delete
                </Button>
            </Box>
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
                <StructureAdd />
            </Modal>
        </Box>
    )
}