import gql from "graphql-tag";

export const SEND_LOGIN_DATA = gql`
  mutation ($login: String!, $password: String!) {
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
    }
  }
`;
