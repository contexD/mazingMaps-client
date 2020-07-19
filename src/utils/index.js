export function setSelectedNode(client, id) {
  client.writeData({
    data: {
      selectedNode: {
        __typename: "selectedNode",
        id,
      },
    },
  });
}
