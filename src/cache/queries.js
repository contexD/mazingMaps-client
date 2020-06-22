import gql from "graphql-tag";

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
