import gql from "graphql-tag";

export const SEND_LOGIN_DATA = gql`
  mutation login($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;
