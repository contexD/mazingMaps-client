import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { GET_GRAPHS } from "../cache/queries";
import { DELETE_GRAPH, CREATE_GRAPH } from "../cache/mutations";
import { makeStyles, List, Grid, Typography, Divider, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Graph from "../components/Graph";
import Loader from "../components/Loader";
import DialogForm from "../components/DialogForm";
import { showMessage } from "../utils/appState";

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
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  /* handlers for showing form dialog */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* fetch graphs */
  const { data, loading, client } = useQuery(GET_GRAPHS);

  /* mutation for deleting graphs */
  const [deleteGraph] = useMutation(
    DELETE_GRAPH,
    {
      update(
        cache,
        {
          data: {
            deleteGraph: {
              graph: { id },
            },
          },
        }
      ) {
        const { allGraphs } = cache.readQuery({ query: GET_GRAPHS });
        cache.writeQuery({
          query: GET_GRAPHS,
          data: { allGraphs: allGraphs.filter((graph) => graph.id !== id) },
        });
      },
      onCompleted(data) {
        const {
          deleteGraph: { message, success },
        } = data;
        showMessage(client, message, success);
      },
    }
  );

  /* thunk for deleting graphs */
  const deleteGraphThunk = (id) => {
    deleteGraph({ variables: { id } });
  };

  /* mutation for creating graphs */
  const [createGraph, { data: responseCreateGraph }] = useMutation(
    CREATE_GRAPH,
    {
      update(
        cache,
        {
          data: {
            createGraph: { graph },
          },
        }
      ) {
        const { allGraphs } = cache.readQuery({ query: GET_GRAPHS });
        cache.writeQuery({
          query: GET_GRAPHS,
          data: { allGraphs: [...allGraphs, graph] },
        });
      },
      onCompleted(data) {
        const {
          createGraph: { message, success },
        } = data;
        showMessage(client, message, success);
      },
    }
  );

  /* thunk for creating graphs */
  const createGraphThunk = (name) => {
    createGraph({ variables: { name } });
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
                          delete={deleteGraphThunk}
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
              create={createGraphThunk}
              labelTextField="Name"
              buttonText="create"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
