import gql from "graphql-tag";

//local fields

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;

export const SELECTED_NODE = gql`
  query {
    selectedNodeId @client
  }
`;

export const APP_LOADING = gql`
  query {
    appLoading @client
  }
`;

export const MESSAGE = gql`
  query {
    message @client
  }
`;

export const SHOW_MESSAGE = gql`
  query {
    showMsg @client
  }
`;

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
      id
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
