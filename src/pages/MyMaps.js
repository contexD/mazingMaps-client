import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";
import { GET_GRAPHS } from "../cache/queries";
import { DELETE_GRAPH } from "../cache/mutations";
import {
  makeStyles,
  Fab,
  List,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Graph from "../components/Graph";
import Loader from "../components/Loader";

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

const updateAfterDelete = {
  update(
    cache,
    {
      resDelete: {
        graph: { id },
      },
    }
  ) {
    const { allGraphs } = cache.readQuery({ query: GET_GRAPHS });
    cache.writeQuery({
      query: GET_GRAPHS,
      data: { allGraphs: allGraphs.filter((graph) => graph.id !== id) },
    });
  },
};

export default function MyMaps(props) {
  const classes = useStyles();

  /* fetch graphs */
  const { data, loading, client } = useQuery(GET_GRAPHS);

  /* mutation for deleting graphs */
  const [deleteGraph, { data: resDelete }] = useMutation(DELETE_GRAPH, {
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
  });

  /* thunk for deleting graphs */
  const deleteGraphThunk = (id) => {
    deleteGraph({ variables: { id } });
  };

  if (!loading) {
    console.log("graph data", data);
  }
  if (resDelete) {
    console.log("resDelete", resDelete);
  }

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
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
