import React, { useState } from "react";
import { useApolloClient, useMutation, useQuery } from "react-apollo";
import ReactFlow, { Background, Controls } from "react-flow-renderer";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import DialogForm from "../components/DialogForm";
import inputNode from "./inputNode";
import { showMessage } from "../utils/appState";
import { GET_GRAPH } from "../cache/queries";
import { CREATE_VERTEX } from "../cache/mutations";

// const elements = [
//   { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
//   { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
//   { id: "e1-2", source: "1", target: "2", animated: true },
// ];

const graphStyles = { width: "100%", height: "93vh" };

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function Map(props) {
  const client = useApolloClient();

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

  const [open, setOpen] = useState(false);
  const [stateCoord, setStateCoord] = useState(initialState);
  const [newNodeData, setNewNodeData] = useState("");
  const [newNodeCoord, setNewNodeCoord] = useState({ x: null, y: null });

  if (!loading && data) console.log("vertices data", data);
  if (error) console.log("error", error);
  const elements = [...props.graphData.vertices, ...props.graphData.edges];

  /* handlers for context menu */
  const handleClickMenu = (event) => {
    event.preventDefault();
    setStateCoord({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
    setNewNodeCoord({ x: event.clientX - 2, y: event.clientY - 4 });
  };

  const handleCloseMenu = () => {
    setStateCoord(initialState);
  };

  const handleMenuItemClick = (event) => {
    const { mouseX: x, mouseY: y } = stateCoord;
    createVertex({
      variables: { label: "new node", x, y, graphId: props.graphId },
    });
    handleCloseMenu();
  };

  return (
    <div onContextMenu={handleClickMenu}>
      <ReactFlow
        elements={elements}
        style={graphStyles}
        nodeTypes={{ inputNode }}
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
        <MenuItem onClick={handleMenuItemClick}>new node</MenuItem>
      </Menu>
    </div>
  );
}
