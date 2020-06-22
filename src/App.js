import React from "react";
import { Switch, Route } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

import Home from "./pages/Home";
import MapCreator from "./pages/MapCreator";
import Tutorial from "./pages/Tutorial";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import Toast from "./components/Toast";

function App() {
  // const client = useApolloClient();
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
        {/* <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} /> */}
      </Switch>
    </div>
  );
}

export default App;
