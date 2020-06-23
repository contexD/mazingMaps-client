import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/react-hooks";

import Home from "./pages/Home";
import MapCreator from "./pages/MapCreator";
import Tutorial from "./pages/Tutorial";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import { ME, IS_LOGGED_IN } from "./cache/queries";

function App() {
  const token = localStorage.getItem("token");
  const client = useApolloClient();
  const { data } = useQuery(ME, { pollInterval: 20000 });
  const {
    data: { loggedIn },
  } = useQuery(IS_LOGGED_IN);

  console.log("\n loggedIn \n ", loggedIn);
  console.log("\n token \n ", token);

  /* check whether JWT is still valid;
  update local state accordingly */
  if (data && !data.me) {
    localStorage.setItem("token", null);
    client.writeData({ data: { loggedIn: false } });
  } else if (data && data.me) {
    client.writeData({ data: { loggedIn: true } });
  }

  // client.writeData({ data: { appLoading: true } });
  // setTimeout(() => client.writeData({ data: { appLoading: false } }), 5000);
  // client.writeData({
  //   data: {
  //     message: {
  //       __typename: "Message",
  //       severity: "success",
  //       text: "test message",
  //     },
  //     showMessage: true,
  //   },
  // });

  //items for navigation bar
  const menuItems = [
    { route: "/mapcreator", linkText: "Mapcreator" },
    { route: "/tutorial", linkText: "Tutorial" },
  ];

  return (
    <div className="App">
      <Navigation menuItems={menuItems} />
      <Loader />
      <Toast />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mapcreator" component={MapCreator} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/signup">
          {loggedIn ? <Redirect to="/mapcreator" /> : <SignUp />}
        </Route>
        <Route path="/login">
          {loggedIn ? <Redirect to="/mapcreator" /> : <Login />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
