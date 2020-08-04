import { useEffect } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_GRAPH, DELETE_GRAPH } from "../model/operations/mutations";

import useApp from "./useApp";

export default function useMap() {
  //hooks
  const { setMessage, setShowMsg, setAppLoading } = useApp();

  const [createGraph, { loading: loadingNewGraph }] = useMutation(
    CREATE_GRAPH,
    {
      update(
        cache,
        {
          data: {
            createGraph: { graph: newGraph },
          },
        }
      ) {
        cache.modify({
          fields: {
            allGraphs(existingGraphs, { toReference }) {
              return [
                ...existingGraphs,
                { __typename: "Graph", Graph: toReference(newGraph) },
              ];
            },
          },
        });
      },
      onCompleted(data) {
        const {
          createGraph: { message, success },
        } = data;
        setMessage(message, success);
        setShowMsg(true);
      },
    }
  );
  //thunk for creating graphs
  const createMap = (name) => createGraph({ variables: { name } });

  const [deleteGraph] = useMutation(DELETE_GRAPH, {
    update(
      cache,
      {
        data: {
          deleteGraph: {
            graph: { id: deletedGraphId },
          },
        },
      }
    ) {
      cache.modify({
        fields: {
          allGraphs(existingGraphs, { readField }) {
            return existingGraphs.filter(
              (graph) => readField("id", graph) !== deletedGraphId
            );
          },
        },
      });

      //remove graph object from cache
      cache.evict({ id: `Graph:${deletedGraphId}` });
    },
    onCompleted(data) {
      const {
        deleteGraph: { success, message },
      } = data;
      setMessage(message, success);
      setShowMsg(true);
    },
  });
  //thunk for deleting graphs
  const deleteMap = (id) => deleteGraph({ variables: { id } });

  useEffect(() => {
    setAppLoading(!!loadingNewGraph);
  }, [loadingNewGraph, setAppLoading]);

  return { createMap, deleteMap };
}
