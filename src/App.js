import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "./model/operations/queries";

import Home from "./pages/Home";
import Map from "./components/Map";
import Tutorial from "./pages/Tutorial";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navigation from "./components/Navigation";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import MyMaps from "./pages/MyMaps";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { data } = useQuery(IS_LOGGED_IN);
  const { checkIsLoggedIn } = useAuth();

  useEffect(() => {
    checkIsLoggedIn();
  }, [checkIsLoggedIn]);

  //items for navigation bar (public)
  const menuItems = [{ route: "/mapcreator", linkText: "Mapcreator" }];

  return (
    <div className="App">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <Navigation menuItems={menuItems} />
      <Loader />
      <Toast />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mapcreator/:id" component={Map} />
        <ProtectedRoute path="/tutorial" redirectTo="/" component={Tutorial} />
        <ProtectedRoute path="/mymaps" redirectTo="/" component={MyMaps} />
        <Route path="/signup">
          {data && data.isLoggedIn ? <Redirect to="/mymaps" /> : <SignUp />}
        </Route>
        <Route path="/login">
          {data && data.isLoggedIn ? <Redirect to="/mymaps" /> : <Login />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
