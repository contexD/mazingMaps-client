import gql from "graphql-tag";

//login and signup

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

//graph

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

//vertices

export const CREATE_VERTEX = gql`
  mutation($label: String!, $x: Float!, $y: Float!, $graphId: ID!) {
    createVertex(
      data: { label: $label }
      position: { x: $x, y: $y }
      graphId: $graphId
    ) {
      vertex {
        id
        data {
          label
        }
        type
        position {
          x
          y
        }
      }
      success
      message
    }
  }
`;

export const UPDATE_VERTEX_DATA = gql`
  mutation($id: ID!, $data: DataInput!) {
    updateVertexData(id: $id, data: $data) {
      vertex {
        id
        data {
          label
        }
      }
    }
  }
`;

export const UPDATE_POSITION = gql`
  mutation($id: ID!, $x: Float!, $y: Float!) {
    updateVertexPosition(id: $id, position: { x: $x, y: $y }) {
      vertex {
        id
        position {
          x
          y
        }
      }
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

//edges

export const CREATE_EDGE = gql`
  mutation($sourceId: ID!, $targetId: ID!) {
    createEdge(sourceId: $sourceId, targetId: $targetId) {
      edge {
        id
        source
        target
        animated
      }
      success
      message
    }
  }
`;

export const DELETE_EDGE = gql`
  mutation($id: String!) {
    deleteEdge(id: $id) {
      edge {
        id
      }
      success
      message
    }
  }
`;
