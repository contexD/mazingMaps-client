import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SEND_SIGN_UP_DATA } from "../model/mutations";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import { showMessage } from "../utils/appState";

function Buffer(
  email = "",
  password = "",
  passwordRepeat = "",
  firstName = "",
  lastName = ""
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
  this.passwordRepeat = passwordRepeat;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "25%",
  },

  item: {
    padding: theme.spacing(3),
  },
}));

export default function SignUpForm(props) {
  const [buffer, setBuffer] = useState(new Buffer());
  const [sendSignUp, { data, error, client }] = useMutation(SEND_SIGN_UP_DATA);
  const classes = useStyles();

  useEffect(() => {
    if (data && data.signUp.token.jwt) {
      const updateCache = async () => {
        await localStorage.setItem("token", data.signUp.token.jwt);
        await client.resetStore();
        showMessage(client, data.signUp.message, data.signUp.success);
        props.refetchMe();
      };
      updateCache();
    } else if (data) {
      showMessage(client, data.signUp.message, data.signUp.success);
    }
  }, [data, client, error, props]);

  const signUpHandler = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = buffer;
    sendSignUp({
      variables: { firstName, lastName, email, password },
    });
    setBuffer(new Buffer());
  };

  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Typography variant="h3">Sign Up</Typography>

        <Grid item className={classes.item}>
          <FormControl>
            <TextField
              required
              id="firstName"
              label="first name"
              value={buffer.firstName}
              onChange={(e) =>
                setBuffer({ ...buffer, firstName: e.target.value })
              }
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item className={classes.item}>
          <FormControl>
            <TextField
              required
              id="lastName"
              label="last name"
              value={buffer.lastName}
              onChange={(e) =>
                setBuffer({ ...buffer, lastName: e.target.value })
              }
              variant="outlined"
            />
          </FormControl>
        </Grid>

        <Grid item className={classes.item}>
          <FormControl>
            <TextField
              id="outlined-email-input"
              required
              label="email"
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
              label="password"
              type="password"
              required
              autoComplete="current-password"
              variant="outlined"
              value={buffer.password}
              onChange={(e) =>
                setBuffer({ ...buffer, password: e.target.value })
              }
            />
          </FormControl>
        </Grid>

        <Grid item className={classes.item}>
          <FormControl>
            <TextField
              id="outlined-password-input"
              label="repeat password"
              type="password"
              required
              variant="outlined"
              value={buffer.passwordRepeat}
              onChange={(e) =>
                setBuffer({ ...buffer, passwordRepeat: e.target.value })
              }
            />
          </FormControl>
        </Grid>

        <Grid container direction="row" justify="center">
          <Grid item className={classes.item}>
            <Button variant="contained" color="primary" onClick={signUpHandler}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
