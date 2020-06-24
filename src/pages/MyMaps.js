import React from "react";
import { appLoading } from "../utils/appState";
import Graph from "../components/Graph";
import Loader from "../components/Loader";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";
import { GET_GRAPHS } from "../cache/queries";
import { DELETE_GRAPH } from "../cache/mutations";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function MyMaps(props) {
  const { id: userId } = useParams();
  const classes = useStyles();

  /* fetch graphs */
  const { data, loading, client } = useQuery(GET_GRAPHS);
  const [deleteGraph, { data: resDelete }] = useMutation(DELETE_GRAPH);

  /* thunk for deleting graphs */
  const deleteGraphThunk = (id) => {
    const index = data.allGraphs.findIndex((graph) => graph.id === id);
    data.allGraphs.splice(index, 0);
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
      <Grid container justify="center">
        <Grid className={classes.root}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              MyMaps
            </Typography>
            <div className={classes.demo}>
              <List dense={false}>
                {!loading &&
                  data.allGraphs.map((graph) => {
                    return (
                      <Graph
                        key={graph.id}
                        id={graph.id}
                        name={graph.name}
                        delete={deleteGraphThunk}
                      />
                    );
                  })}
              </List>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
