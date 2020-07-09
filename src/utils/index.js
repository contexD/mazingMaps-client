/* convert data into array for react flow renderer */
export function parseVertices(vertices, onChange, edgeIsAnimated = true) {
  let edges = [];
  // map over all the vertices in the graph
  const nodes = vertices.map((vertex) => {
    const { id, data, type, x, y, targets } = vertex;
    // extract all targets of this vertex
    if (targets.length !== 0) {
      const vertexTargets = targets.map((target) => {
        return {
          id: `e${id}-${target.id}`,
          source: `${id}`,
          target: `${target.id}`,
          animated: edgeIsAnimated,
        };
      });
      // append targets of this vertex to edges
      edges = edges.concat(vertexTargets);
    }
    // return correct node type
    if (type === "default") {
      return { id: `${id}`, data: { label: `${data}` }, position: { x, y } };
    } else if (type === "inputNode") {
      return {
        id: `${id}`,
        data: { onChange: onChange(id), label: `${data}` },
        position: { x, y },
      };
    }
  });
  return edges.length === 0 ? [...nodes] : [...nodes, ...edges];
}
