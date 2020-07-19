import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import LoginForm from "../components/LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    spacing: theme.spacing(0),
    direction: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <LoginForm refetchMe={props.refetchMe} />
    </Grid>
  );
}
