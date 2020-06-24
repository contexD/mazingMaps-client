import React, { useEffect } from "react";
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
import { ME_CACHE, IS_LOGGED_IN, ME } from "./cache/queries";

function App() {
  // const client = useApolloClient();
  // const { meData } = client.readQuery({ query: ME });
  const { data, refetch } = useQuery(ME);

  const refetchMe = () => refetch();

  // try {
  //   const { meData } = client.readQuery({ query: ME });
  //   me = meData;
  // } catch (e) {
  //   me = null;
  // }

  if (data) console.log("me in App", data.me);

  // const loginUser = (me) => {
  //   const { id, firstName, lastName, email } = me;
  //   client.writeData({
  //     data: {
  //       loggedIn: true,
  //       auth: {
  //         __typename: "Auth",
  //         me: { __typename: "User", id, firstName, lastName, email },
  //       },
  //     },
  //   });
  // };

  //get access token from cache
  //if access token is there, set localStorage to the access token
  //next, get me, if succeeds, set user

  // useEffect(() => {
  //   //   if (data && data.auth.accessToken) {
  //   //     localStorage.setItem("token", data.auth.accessToken);
  //   //     console.log("localStorage.token", localStorage.token);
  //   //     console.log("refetching now");
  //   //     client.resetStore();
  //   //   }
  //   if (meData && meData.me) {
  //     client.resetStore();
  //     loginUser(meData.me);
  //   }
  // }, [data, meData, loginUser, refetch]);

  // if (meData) console.log("\n meData \n ", meData);
  // console.log("\n token \n ", token);

  /* check whether JWT is still valid;
  update local state accordingly */
  // if (data && !data.me) {
  //   localStorage.setItem("token", null);
  //   client.writeData({ data: { loggedIn: false } });
  // } else if (data && data.me) {
  //   client.writeData({ data: { loggedIn: true } });
  // }

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
      <Navigation menuItems={menuItems} refetchMe={refetchMe} />
      <Loader />
      <Toast />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mapcreator" component={MapCreator} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/signup">
          {data && data.me ? (
            <Redirect to="/mapcreator" />
          ) : (
            <SignUp refetchMe={refetchMe} />
          )}
        </Route>
        <Route path="/login">
          {data && data.me ? (
            <Redirect to="/mapcreator" />
          ) : (
            <Login refetchMe={refetchMe} />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
