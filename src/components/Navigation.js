import React from "react";
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
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import useApp from "../hooks/useApp";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation(props) {
  const { data } = useQuery(ME);
  const { setMessage, setShowMsg } = useApp();
  const { logout } = useAuth();
  const classes = useStyles();

  const logoutHandler = async () => {
    logout();
    setMessage("You're logged out now", true);
    setShowMsg(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={RouterLink}
            to={"/"}
          >
            <HomeIcon />
          </IconButton>

          {props.menuItems.map((item) => {
            return (
              <Button
                color="inherit"
                variant="text"
                className={classes.title}
                component={RouterLink}
                to={item.route}
              >
                {item.linkText}
              </Button>
            );
          })}
          {data && data.me ? (
            <Button
              color="inherit"
              className={classes.title}
              to={"/mymaps/" + data.me.id}
              component={RouterLink}
            >
              MyMaps
            </Button>
          ) : null}
          {data && data.me ? (
            <Typography variant="h6" className={classes.title}>
              {data.me.firstName}
            </Typography>
          ) : null}
          {data && data.me ? (
            <Button
              color="inherit"
              edge=""
              onClick={logoutHandler}
              component={RouterLink}
              to={"/"}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                edge=""
                component={RouterLink}
                to={"/login"}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
