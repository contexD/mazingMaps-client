import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { useQuery, useApolloClient } from "react-apollo";
import { IS_LOGGED_IN } from "../cache/queries";

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
  const client = useApolloClient();
  const { data } = useQuery(IS_LOGGED_IN);

  const logoutHandler = () => {
    localStorage.setItem("token", null);
    client.writeData({
      data: {
        loggedIn: false,
        message: {
          __typename: "Message",
          severity: "success",
          text: "You're logged out now",
        },
        showMessage: true,
      },
    });
  };

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
          {data && data.loggedIn ? (
            <Button color="inherit" edge="" onClick={logoutHandler}>
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
