import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

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
  const classes = useStyles();

  return (
    <div>
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
                component={RouterLink}
                to={item.route}
              >
                {item.linkText}
              </Button>
            );
          })}
          <Button color="inherit" edge="">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
