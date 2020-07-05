import React from "react";
import { Grid } from "@material-ui/core";
import SignUpForm from "../components/SignUpForm";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    spacing: theme.spacing(0),
    direction: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <SignUpForm refetchMe={props.refetchMe} />
    </Grid>
  );
}
