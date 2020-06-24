import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "fontsource-roboto";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { resolvers } from "./cache/resolvers";
import { typeDefs } from "./cache/schema";

const token = localStorage.getItem("token");

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  // request: (operation) => {
  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : "",
  //     },
  //   });
  // },
  // headers: {
  //   authorization: token ? `Bearer ${token}` : "",
  // },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
  resolvers,
  connectToDevTools: true,
});

cache.writeData({
  data: {
    appLoading: false,
    showMessage: false,
    message: { __typename: "Message", severity: "", text: "" },
    auth: {
      __typename: "Auth",
      me: {
        __typename: "User",
        id: null,
        email: "",
        firstName: "",
        lastName: "",
      },
      accessToken: null,
    },
  },
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
