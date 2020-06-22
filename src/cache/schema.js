import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    getAppState: appState!
  }

  type appState {
    isLoggedIn: Boolean!
    appLoading: Boolean!
    showMessage: Boolean!
    message: Message!
  }

  type Message {
    severity: String!
    text: String!
  }
`;
