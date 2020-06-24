import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { useQuery, useApolloClient } from "react-apollo";
import { ME } from "../cache/queries";

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
  const { data } = useQuery(ME);
  // const { data } = useQuery(IS_LOGGED_IN);
  // let me = null;

  // try {
  //   const { meData } = client.readQuery({ query: ME });
  //   me = meData;
  // } catch (e) {
  //   me = null;
  // }

  console.log("me in Navbar", data && data.me);

  const logoutHandler = async () => {
    await localStorage.removeItem("token");
    await client.resetStore();
    await client.writeData({
      data: {
        message: {
          __typename: "Message",
          severity: "success",
          text: "You're logged out now",
        },
        showMessage: true,
        auth: {
          __typename: "Auth",
          accessToken: null,
          me: {
            __typename: "User",
            id: "",
            email: "",
            firstName: "",
            lastName: "",
          },
        },
      },
    });
    props.refetchMe();
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
