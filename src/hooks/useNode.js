import { useMutation } from "@apollo/client";

import { GET_GRAPH } from "../model/operations/queries";
import {
  CREATE_VERTEX,
  UPDATE_POSITION,
  DELETE_VERTEX,
} from "../model/operations/mutations";

export function useNode() {
  const [createVertex] = useMutation(CREATE_VERTEX, {
    update(
      cache,
      {
        data: {
          createVertex: { vertex },
        },
      }
    ) {
      const data = cache.readQuery({
        query: GET_GRAPH,
        variables: { id: props.graphId },
      });
      data.graph.vertices = [...data.graph.vertices, vertex];
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: props.graphId },
        data,
      });
    },
  });
  //thunk for export
  const createNode = (label, x, y, graphId) =>
    createVertex({ variables: { label, x, y, graphId } });

  const [updatePosition] = useMutation(UPDATE_POSITION);
  //callback for react flow renderer
  const updateCoordinates = ({ id, position: { x, y } }) =>
    updatePosition({ variables: { id, x, y } });

  const [deleteVertex] = useMutation(DELETE_VERTEX, {
    update(
      cache,
      {
        data: {
          deleteVertex: { vertex },
        },
      }
    ) {
      const data = cache.readQuery({
        query: GET_GRAPH,
        variables: { id: props.graphId },
      });
      data.graph.vertices = [...data.graph.vertices].filter(
        (ele) => ele.id !== vertex.id
      );
      data.graph.edges = [...data.graph.edges].filter(
        (ele) => ele.source !== vertex.id && ele.target !== vertex.id
      );
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: props.graphId },
        data,
      });
    },
  });
  //thunk for export
  const deleteNode = (id, x, y) => deleteVertex({ variables: { id, x, y } });

  return { createNode, updateCoordinates, deleteNode };
}
