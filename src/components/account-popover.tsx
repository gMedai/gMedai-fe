import { useContext } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography, ListItemIcon } from "@mui/material";
import { AuthContext } from "../contexts/auth-context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const authContext = useContext(AuthContext);

  const handleLogOut = async () => {
    onClose?.();

    // Check if authentication with Zalter is enabled

    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      // await auth.signOut();

      // Update Auth Context state
      // authContext.signOut();

      // Redirect to sign-in page
      Router.push("/login").catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Account Information
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          Diagnostic History
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          Log out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
