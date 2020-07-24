import { useMutation } from "@apollo/client";
import { GET_GRAPH } from "../model/operations/queries";
import { CREATE_EDGE, DELETE_EDGE } from "../model/operations/mutations";

export default function useLink(graphId) {
  const [createEdge] = useMutation(CREATE_EDGE, {
    update(
      cache,
      {
        data: {
          createEdge: { edge },
        },
      }
    ) {
      const data = cache.readQuery({
        query: GET_GRAPH,
        variables: { id: graphId },
      });
      data.graph.edges = [...data.graph.edges, edge];
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: graphId },
        data,
      });
    },
  });
  //callback for react flow renderer
  const createLink = ({ source, target }) => {
    createEdge({ variables: { sourceId: source, targetId: target } });
  };

  const [deleteLink] = useMutation(DELETE_EDGE, {
    update(
      cache,
      {
        data: {
          deleteEdge: { edge },
        },
      }
    ) {
      const data = cache.readQuery({
        query: GET_GRAPH,
        variables: { id: graphId },
      });
      data.graph.edges = [...data.graph.edges].filter(
        (ele) => ele.id !== edge.id
      );
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: graphId },
        data,
      });
    },
  });

  return { createLink, deleteLink };
}
