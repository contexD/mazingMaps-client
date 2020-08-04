import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { APP_LOADING } from "../model/operations/queries";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  FormControl,
  TextField,
  Typography,
  Button,
  Link,
} from "@material-ui/core";

import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

function Buffer(email = "", password = "") {
  this.email = email;
  this.password = password;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  item: {
    padding: theme.spacing(3),
  },
}));

export default function LoginForm() {
  const { data } = useQuery(APP_LOADING);
  const [buffer, setBuffer] = useState(new Buffer());
  const { sendLogin } = useAuth();
  const classes = useStyles();

  const loginHandler = (event) => {
    event.preventDefault();
    sendLogin({
      variables: { login: buffer.email, password: buffer.password },
    });
    setBuffer(new Buffer());
  };

  return data.appLoading ? (
    <Loader open={data.appLoading} />
  ) : (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Typography variant="h3">Login</Typography>
        <Grid item className={classes.item}>
          <FormControl>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              variant="outlined"
              value={buffer.email}
              onChange={(e) => setBuffer({ ...buffer, email: e.target.value })}
            />
          </FormControl>
        </Grid>

        <Grid item className={classes.item}>
          <FormControl>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={buffer.password}
              onChange={(e) =>
                setBuffer({ ...buffer, password: e.target.value })
              }
            />
          </FormControl>
        </Grid>

        <Grid container direction="row" justify="center">
          <Grid item className={classes.item}>
            <Button variant="contained" color="primary" onClick={loginHandler}>
              log in
            </Button>
          </Grid>
          <Grid item className={classes.item}>
            <Typography className={classes.root}>
              <Link href="#" component={RouterLink} to="/signup">
                Sign up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
