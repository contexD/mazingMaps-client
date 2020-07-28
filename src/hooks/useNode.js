import { useMutation } from "@apollo/client";
import { GET_GRAPH } from "../model/operations/queries";
import {
  CREATE_VERTEX,
  UPDATE_VERTEX_DATA,
  UPDATE_POSITION,
  DELETE_VERTEX,
} from "../model/operations/mutations";
import { selectedNodeIdVar } from "../model/cache";

export default function useNode(graphId) {
  const [createNode] = useMutation(CREATE_VERTEX, {
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
        variables: { id: graphId },
      });
      data.graph.vertices = [...data.graph.vertices, vertex];
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: graphId },
        data,
      });
    },
  });

  const [updateVertexData] = useMutation(UPDATE_VERTEX_DATA);

  const [updatePosition] = useMutation(UPDATE_POSITION);
  //callback for react flow renderer
  const updateCoordinates = ({ id, position: { x, y } }) =>
    updatePosition({ variables: { id, x, y } });

  const [deleteNode] = useMutation(DELETE_VERTEX, {
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
        variables: { id: graphId },
      });
      data.graph.vertices = [...data.graph.vertices].filter(
        (ele) => ele.id !== vertex.id
      );
      data.graph.edges = [...data.graph.edges].filter(
        (ele) => ele.source !== vertex.id && ele.target !== vertex.id
      );
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: graphId },
        data,
      });
    },
  });

  const setSelectedNode = (id) => selectedNodeIdVar(id);

  return { createNode, updateVertexData, updateCoordinates, deleteNode, setSelectedNode };
}
