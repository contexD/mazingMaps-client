import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import ReactFlow, {
  Background,
  Controls,
  isNode,
  isEdge,
} from "react-flow-renderer";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import inputNode from "./inputNode";
import { showMessage } from "../utils/appState";
import { GET_GRAPH, GET_SELECTED_NODE } from "../cache/queries";
import {
  CREATE_VERTEX,
  CREATE_EDGE,
  UPDATE_POSITION,
  DELETE_VERTEX,
  DELETE_EDGE,
} from "../cache/mutations";

const graphStyles = { width: "100%", height: "93vh" };

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function Map(props) {
  const { data: nodeData } = useQuery(GET_SELECTED_NODE);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [open, setOpen] = useState(false);
  const [stateCoord, setStateCoord] = useState(initialState);

  const elements = [...props.graphData.vertices, ...props.graphData.edges];

  const [createVertex, { loading, error, data }] = useMutation(CREATE_VERTEX, {
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
        variables: { id: props.graphId },
      });
      data.graph.edges = [...data.graph.edges, edge];
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: props.graphId },
        data,
      });
    },
  });
  //callback for react flow renderer
  const makeEdge = ({ source, target }) => {
    createEdge({ variables: { sourceId: source, targetId: target } });
  };

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
        (ele) => ele.id != vertex.id
      );
      data.graph.edges = [...data.graph.edges].filter(
        (ele) => ele.source != vertex.id && ele.target != vertex.id
      );
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: props.graphId },
        data,
      });
    },
  });

  const [deleteEdge] = useMutation(DELETE_EDGE, {
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
        variables: { id: props.graphId },
      });
      data.graph.edges = [...data.graph.edges].filter(
        (ele) => ele.id != edge.id
      );
      cache.writeQuery({
        query: GET_GRAPH,
        variables: { id: props.graphId },
        data,
      });
    },
  });

  /* handlers for context menu */
  const handleClickMenu = (event) => {
    event.preventDefault();
    setStateCoord({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseMenu = () => {
    setStateCoord(initialState);
    setTimeout(() => setSelectedEdge(null), 1000);
  };

  const handleMenuItemClick = (item) => (event) => {
    const { mouseX: x, mouseY: y } = stateCoord;

    if (item === "new node") {
      createVertex({
        variables: { label: "new node", x, y, graphId: props.graphId },
      });
    } else if (item === "delete node") {
      deleteVertex({ variables: { id: nodeData.selectedNode.id } });
    } else if (item === "delete link") {
      deleteEdge({ variables: { id: selectedEdge.id } });
    }

    handleCloseMenu();
  };

  return (
    <div onContextMenu={handleClickMenu}>
      <ReactFlow
        elements={elements}
        style={graphStyles}
        nodeTypes={{ inputNode }}
        onConnect={makeEdge}
        onNodeDragStop={updateCoordinates}
        onElementClick={(ele) => (isEdge(ele) ? setSelectedEdge(ele) : null)}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <Menu
        keepMounted
        open={stateCoord.mouseY !== null}
        onClose={handleCloseMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          stateCoord.mouseY !== null && stateCoord.mouseX !== null
            ? { top: stateCoord.mouseY, left: stateCoord.mouseX }
            : undefined
        }
      >
        {nodeData && nodeData.selectedNode.id ? (
          <MenuItem onClick={handleMenuItemClick("delete node")}>
            delete node
          </MenuItem>
        ) : selectedEdge ? (
          <MenuItem onClick={handleMenuItemClick("delete link")}>
            delete link
          </MenuItem>
        ) : (
          <MenuItem onClick={handleMenuItemClick("new node")}>
            new node
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
