import { useMutation } from "@apollo/client";
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
      cache.modify({
        id: `Graph:${graphId}`,
        fields: {
          vertices(existingVertices, { toReference }) {
            return [
              ...existingVertices,
              { __typename: "Vertex", Vertex: toReference(vertex) },
            ];
          },
        },
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
          deleteVertex: { vertex: deletedVertex },
        },
      }
    ) {
      const edgesToDelete = [];
      cache.modify({
        id: `Graph:${graphId}`,
        fields: {
          vertices(existingVertices, { readField }) {
            return existingVertices.filter(
              (vertex) => readField("id", vertex) !== deletedVertex.id
            );
          },
          edges(existingEdges, { readField }) {
            return existingEdges.filter((edge) => {
              if (
                readField("source", edge) === deletedVertex.id ||
                readField("target", edge) === deletedVertex.id
              ) {
                edgesToDelete.push(readField("id", edge));
                return false;
              }
              return true;
            });
          },
        },
      });

      //remove vertex object from cache
      cache.evict({ id: `Vertex:${deletedVertex.id}` });
      //remove edge objects from cache
      for (let i = 0; i < edgesToDelete.length; i++) {
        cache.evict({ id: `Edge:${edgesToDelete[i]}` });
      }
    },
  });

  const setSelectedNode = (id) => selectedNodeIdVar(id);

  return {
    createNode,
    updateVertexData,
    updateCoordinates,
    deleteNode,
    setSelectedNode,
  };
}
