import React from "react";
import { Redirect } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from "../model/operations/queries";

export default function ProtectedRoute(props) {
  const { data } = useQuery(IS_LOGGED_IN);
  const { component: Component } = props;

  return data && data.isLoggedIn ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
}
