import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME } from "../model/operations/queries";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";

import useApp from "../hooks/useApp";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NewNavigation() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const { data } = useQuery(ME);
  const { setMessage, setShowMsg } = useApp();
  const { logout } = useAuth();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    logout();
    setMessage("You're logged out now", true);
    setShowMsg(true);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.container}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              component={RouterLink}
              to={"/"}
            >
              <HomeIcon className={classes.menuButton} />
              <Typography>MazingMapper</Typography>
            </IconButton>
          </div>
          {data && data.me ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Maps</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              aria-label="login-button"
              color="inherit"
              to="/login"
              component={RouterLink}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
