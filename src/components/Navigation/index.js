import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME } from "../../model/operations/queries";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import NavbarMenu from "./NavbarMenu";

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

export default function Navigation() {
  const { data } = useQuery(ME);
  const classes = useStyles();

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
            <NavbarMenu data={data} />
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
