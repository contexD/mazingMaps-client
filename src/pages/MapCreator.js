import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo";
import { GET_GRAPH } from "../cache/queries";

import Map from "../components/Map";
import Loader from "../components/Loader";

export default function MapCreator() {
  const graphId = useParams().id;

  //fetch graph
  const { data: graphData, loading } = useQuery(GET_GRAPH, {
    variables: { id: graphId },
  });

  return loading && !graphData ? (
    <Loader open={loading} />
  ) : (
    <div>
      <Map
        graphData={graphData.graph}
        graphId={graphId}
      />
    </div>
  );
}
