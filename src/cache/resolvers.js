import gql from "graphql-tag";

export const resolvers = {
  Mutation: {
    updateVertexLabel: (
      _root,
      { id: vertexId, newLabel },
      { cache, getCacheKey }
    ) => {
      const id = getCacheKey({ __typename: "Vertex", id: vertexId });
      const fragment = gql`
        fragment label on Vertex {
          data {
            label
          }
        }
      `;
      const res = cache.readFragment({ fragment, id });
      const data = {
        __typename: "Vertex",
        data: { __typename: "Data", label: newLabel },
      };
      cache.writeData({
        id,
        data,
      });
      return data;
    },
  },
};
