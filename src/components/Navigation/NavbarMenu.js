import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import useApp from "../../hooks/useApp";
import useAuth from "../../hooks/useAuth";

export default function NavbarMenu({data}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const { setMessage, setShowMsg } = useApp();
  const { logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    handleClose();
    logout();
    setMessage("You're logged out now", true);
    setShowMsg(true);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disabled onClick={handleClose}>
          Hi, {data.me.firstName}!
        </MenuItem>
        <MenuItem onClick={handleClose} to="/mymaps" component={RouterLink}>
          My Maps
        </MenuItem>
        <MenuItem to="/" component={RouterLink} onClick={logoutHandler}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
