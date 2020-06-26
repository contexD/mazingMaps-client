import gql from "graphql-tag";

export const SEND_LOGIN_DATA = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      message
      success
      token {
        jwt
      }
    }
  }
`;

export const SEND_SIGN_UP_DATA = gql`
  mutation signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      message
      success
      token {
        jwt
      }
    }
  }
`;

// mutations for mind-maps
export const DELETE_GRAPH = gql`
  mutation deleteGraph($id: ID!) {
    deleteGraph(id: $id) {
      graph {
        id
      }
      success
      message
    }
  }
`;

export const CREATE_GRAPH = gql`
  mutation createGraph($name: String!) {
    createGraph(name: $name) {
      graph {
        id
        name
      }
      success
      message
    }
  }
`;

//mutations for vertices

export const CREATE_VERTEX = gql`
  mutation($data: String!, $x: Int, $y: Int, $graphId: ID!) {
    createVertex(data: $data, x: $x, y: $y, graphId: $graphId) {
      vertex {
        id
        data
        x
        y
      }
      success
      message
    }
  }
`;

export const UPDATE_COORD = gql`
  mutation($id: ID!, $x: Int!, $y: Int!) {
    createVertex(id: $id, x: $x, y: $y) {
      vertex {
        id
        data
        x
        y
      }
      success
      message
    }
  }
`;

export const DELETE_VERTEX = gql`
  mutation($id: ID!) {
    deleteVertex(id: $id) {
      vertex {
        id
      }
      success
      message
    }
  }
`;

// mutations for edges
export const CREATE_EDGE = gql`
  mutation($sourceId: ID!, $targetId: ID!) {
    createEdge(sourceId: $sourceId, targetId: $targetId) {
      edge {
        sourceId
        targetId
      }
      success
      message
    }
  }
`;

export const DELETE_EDGE = gql`
  mutation($sourceId: ID!, $targetId: ID!) {
    deleteEdge(sourceId: $sourceId, targetId: $targetId) {
      edge {
        sourceId
        targetId
      }
      success
      message
    }
  }
`;
