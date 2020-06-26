import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { showMessage } from "../utils/appState";
import { useApolloClient } from "react-apollo";
import DialogForm from "../components/DialogForm";

// const elements = [
//   { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
//   { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
//   { id: "e1-2", source: "1", target: "2", animated: true },
// ];

// const elementsTypes = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Input node" },
//     position: { x: 100, y: 5 },
//   },
//   {
//     id: "2",
//     type: "default",
//     data: { label: "Default node" },
//     position: { x: 100, y: 100 },
//   },
//   {
//     id: "3",
//     type: "output",
//     data: { label: "Output node" },
//     position: { x: 100, y: 200 },
//   },
// ];

const graphStyles = { width: "100%", height: "93vh" };

// const BasicGraph = () => <ReactFlow elements={elements} style={graphStyles} />;

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function Map(props) {
  const client = useApolloClient();
  const [open, setOpen] = useState(false);
  const [stateCoord, setStateCoord] = useState(initialState);
  const [newNodeData, setNewNodeData] = useState("");
  const [newNodeCoord, setNewNodeCoord] = useState({ x: null, y: null });

//   useEffect(() => {
//     if (newNodeData !== "") {
//     }
//   }, [newNodeData, newNodeData, props.cre]);

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

  /* handlers for dialog form */

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleNodeCreation = (name) => {
    setNewNodeData(name);
  };

  return (
    <div onContextMenu={handleClickMenu}>
      <ReactFlow elements={props.data} style={graphStyles}>
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
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleOpenForm();
          }}
        >
          new node
        </MenuItem>
      </Menu>
      <DialogForm
        open={open}
        handleClose={handleCloseForm}
        title="new node"
        create={handleNodeCreation}
        labelTextField="Text"
        buttonText="create"
      />
    </div>
  );
}
