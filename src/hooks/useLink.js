import { useMutation } from "@apollo/client";
import { CREATE_EDGE, DELETE_EDGE } from "../model/operations/mutations";

export default function useLink(graphId) {
  const [createEdge] = useMutation(CREATE_EDGE, {
    update(
      cache,
      {
        data: {
          createEdge: { edge: createdEdge },
        },
      }
    ) {
      cache.modify({
        id: `Graph:${graphId}`,
        fields: {
          edges(existingEdges, { toReference }) {
            return [
              ...existingEdges,
              { __typename: "Edge", Edge: toReference(createdEdge) },
            ];
          },
        },
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
          deleteEdge: { edge: deletedEdge },
        },
      }
    ) {
      cache.modify({
        id: `Graph:${graphId}`,
        fields: {
          edges(existingEdges, { readField }) {
            return existingEdges.filter(
              (edge) => readField("id", edge) !== deletedEdge.id
            );
          },
        },
      });
      //remove edge object from cache
      cache.evict({ id: `Edge:${deletedEdge.id}` });
    },
  });

  return { createLink, deleteLink };
}
