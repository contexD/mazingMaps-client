import gql from "graphql-tag";

export const ME = gql`
  query {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

/* queries for querying graphs */

export const GET_GRAPHS = gql`
  query {
    allGraphs {
      id
      name
    }
  }
`;

export const GET_GRAPH = gql`
  query($id: ID!) {
    graph(id: $id) {
      vertices {
        id
        type
        data {
          label
        }
        position {
          x
          y
        }
      }
      edges {
        id
        source
        target
        animated
      }
    }
  }
`;

/* querying vertices */

export const GET_VERTICES = gql`
  query getVertices($id: ID!) {
    graph(id: $id) @client {
      vertices {
        id
        data {
          label
        }
        position {
          x
          y
        }
        type
      }
    }
  }
`;
