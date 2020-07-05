import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PageTransition } from "@steveeeie/react-page-transition";
import { useQuery } from "@apollo/react-hooks";

import Home from "./pages/Home";
import MapCreator from "./pages/MapCreator";
import Tutorial from "./pages/Tutorial";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import MyMaps from "./pages/MyMaps";
import { ME } from "./cache/queries";

function App() {
  //poll ME every 60 min, to check whether token expired
  const pollInterval = 60 * 60 * 1000;
  const { data, refetch } = useQuery(ME, { pollInterval });

  const refetchMe = () => refetch();

  if (data) console.log("me in App", data.me);

  //items for navigation bar (public)
  const menuItems = [
    { route: "/mapcreator", linkText: "Mapcreator" },
    { route: "/tutorial", linkText: "Tutorial" },
  ];

  return (
    <div className="App">
      <Navigation menuItems={menuItems} refetchMe={refetchMe} />
      <Loader />
      <Toast />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mapcreator/:id" component={MapCreator} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/mymaps">
          {data && data.me ? <MyMaps /> : <Redirect to="/" />}
        </Route>
        <Route path="/signup">
          {data && data.me ? (
            <Redirect to="/mapcreator" />
          ) : (
            <SignUp refetchMe={refetchMe} />
          )}
        </Route>
        <Route path="/login">
          {data && data.me ? (
            <Redirect to="/mymaps" />
          ) : (
            <Login refetchMe={refetchMe} />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
