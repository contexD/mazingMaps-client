import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_GRAPHS } from "../model/operations/queries";

import {
  makeStyles,
  List,
  Grid,
  Typography,
  Divider,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Graph from "../components/Graph";
import Loader from "../components/Loader";
import DialogForm from "../components/DialogForm";
import useMap from "../hooks/useMap";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexGrow: 1,
    minHeight: "100vh",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function MyMaps(props) {
  /* query graphs */
  const { data, loading } = useQuery(GET_GRAPHS);

  //hooks
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { createMap, deleteMap } = useMap();

  /* handlers for showing form dialog */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading ? (
    <Loader open={loading} />
  ) : (
    <div>
      <Grid container className={classes.root} justify="center">
        <Grid row="true">
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              MyMaps
            </Typography>
            <div className={classes.demo}>
              <List dense={false}>
                {data &&
                  data.allGraphs.map((graph, index) => {
                    return (
                      <div key={index}>
                        <Graph
                          id={graph.id}
                          name={graph.name}
                          delete={deleteMap}
                        />
                        <Divider variant="inset" component="li" />
                      </div>
                    );
                  })}
              </List>
            </div>
          </Grid>
          <Grid item>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            <DialogForm
              open={open}
              handleClose={handleClose}
              title="create new mind map"
              create={createMap}
              labelTextField="Name"
              buttonText="create"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
