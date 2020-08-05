import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

import { ReactComponent as MindMapSvg } from "./media/undraw_mind_map.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    spacing: theme.spacing(0),
    direction: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
  descr: {
    marginTop: "5%",
  },
  illustration: {
    width: "100%",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={4}>
          <Typography variant="h2">MazingMapper</Typography>
          <Typography variant="h3">Create mind maps online</Typography>
          <Typography variant="h4" className={classes.descr}>
            It's never been easier and more intuitive to organize your ideas.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/signup"
            className={classes.descr}
          >
            Get started
          </Button>
        </Grid>
        <Grid item xs={6}>
          <MindMapSvg className={classes.illustration} />
        </Grid>
      </Grid>
    </Grid>
  );
}
