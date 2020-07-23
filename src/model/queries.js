import gql from "graphql-tag";

export const GET_APP_STATE = gql`
  query getAppState {
    loggedIn @client
    appLoading @client
    showMessage @client
    message @client {
      severity
      text
    }
    auth @client {
      accessToken
      me {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query {
    getAppState {
      loggedIn @client
    }
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

export const ME_CACHE = gql`
  query {
    me @client {
      id
      firstName
      lastName
      email
    }
  }
`;

export const IS_APP_LOADING = gql`
  query getAppState {
    appLoading @client
  }
`;

export const MESSAGE = gql`
  query getAppState {
    showMessage @client
    message @client {
      severity
      text
    }
  }
`;

export const GET_SELECTED_NODE = gql`
  query {
    selectedNode @client {
      id
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