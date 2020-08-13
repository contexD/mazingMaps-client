import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../model/operations/queries";

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
  title: {
    fontFamily: 'Architects Daughter'
  }
}));

export default function Home() {
  const { data } = useQuery(IS_LOGGED_IN);
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={4}>
          <Typography variant="h2" className={classes.title}>MazingMapper</Typography>
          <Typography variant="h3" className={classes.title}>Create mind maps online</Typography>
          <Typography variant="h4" className={classes.descr}>
            It's never been easier and more intuitive to organize your ideas.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to={data && data.isLoggedIn ? "/mymaps" : "/signup"}
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
