import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    getAppState: appState!
  }

  type appState {
    appLoading: Boolean!
    showMessage: Boolean!
    message: Message!
    auth: Auth!
  }

  type selectedNode {
    id: ID
  }

  type Message {
    severity: String!
    text: String!
  }

  type Auth {
    me: User
    accessToken: String
  }

  type User {
    id: ID
    email: String
    firstName: String
    lastName: String
  }
`;
