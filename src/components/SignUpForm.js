import React, { useState } from "react";
import {
  Grid,
  Paper,
  FormControl,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { SEND_SIGN_UP_DATA } from "../cache/mutations";

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

export default function LoginForm() {
  const [buffer, setBuffer] = useState(new Buffer());
  const [sendSignUp, { data, error }] = useMutation(SEND_SIGN_UP_DATA);
  const client = useApolloClient();
  const classes = useStyles();

  if (data && data.signUp.token) {
    localStorage.setItem("token", data.signUp.token);
    client.writeData({
      data: {
        loggedIn: true,
        message: {
          __typename: "Message",
          severity: "success",
          text: "You're signed up",
        },
        showMessage: true,
      },
    });
  } else if (error) {
    console.log("error", error);
    client.writeData({
      data: {
        message: {
          __typename: "Message",
          severity: "error",
          text: "Signup failed. Please try again.",
        },
        showMessage: true,
      },
    });
  }

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
