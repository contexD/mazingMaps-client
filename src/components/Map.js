import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GRAPH, SELECTED_NODE } from "../model/operations/queries";

import ReactFlow, { Background, Controls, isEdge } from "react-flow-renderer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import useNode from "../hooks/useNode";
import useLink from "../hooks/useLink";
import inputNode from "./inputNode";
import Loader from "../components/Loader";

const graphStyles = { width: "100%", height: "93vh" };

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function Map(props) {
  const graphId = useParams().id;

  //query graph
  const { data: graphData, loading } = useQuery(GET_GRAPH, {
    variables: { id: graphId },
  });

  //query selected node
  const { data: selectedNodeData } = useQuery(SELECTED_NODE);

  //const { data: nodeData } = useQuery(GET_SELECTED_NODE);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [stateCoord, setStateCoord] = useState(initialState);
  const { createNode, updateCoordinates, deleteNode } = useNode();
  const { createLink, deleteLink } = useLink();

  const elements = [...props.graphData.vertices, ...props.graphData.edges];

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
      createNode({
        variables: { label: "new node", x, y, graphId: props.graphId },
      });
    } else if (item === "delete node") {
      //deleteNode({ variables: { id: nodeData.selectedNode.id } });
    } else if (item === "delete link") {
      deleteLink({ variables: { id: selectedEdge.id } });
    }

    handleCloseMenu();
  };

  return loading && !graphData ? (
    <Loader open={loading} />
  ) : (
    <div onContextMenu={handleClickMenu}>
      <ReactFlow
        elements={elements}
        style={graphStyles}
        nodeTypes={{ inputNode }}
        onConnect={createLink}
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
        {selectedNodeData ? (
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
